const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const partials = require('express-partials');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
const chalk = require('chalk');

const db = require('./database/index.js');
const scrapeDb = require('./database/scraper.js');
const ml = require('./learn/naiveBayes.js');
const secret = require('./config.js').secret;

ml.initClassifier();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './splash-client/dist')));

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept, Authorization`);
  const headers = req.headers
  // console.log('auth header is', JSON.parse(headers.authorization))
  console.log('auth header is', JSON.stringify(headers.authorization))
  next();
});

const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://thymely-cd776.firebaseio.com'
});

app.options("/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token');
  console.log('options request made')
  res.send(200);
});

app.post('/session', (req, res) => {
  const idToken = req.body.idToken.toString();
  // authenticate this token, which will always be new (bc user just logged in)
  // send back our own JWT using a client secret with our own expiration policy
  // in electron, use this to manually set a cookie
  // manually attach that cookie to every request (both from renderer and main)
  // in middleware (which applies to all routes besides this one and index), decode that JWT to get the uId
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const token = jwt.sign({ uid }, secret, {
        expiresIn: 86400 * 7 // expires in 1 week
      });
      res.send({uid, token})
    })
    .catch((error) => {
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

app.post('/test', (req, res) => {
  const token = req.body.jwtToken.toString();
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log('decoded token', token)
    console.log('into id', decoded)
    res.status(200).send(decoded);
  });
})

app.get('/api/classifications', async (req, res) => {
  const {user_name, app_name, window_title} = req.query;

  try {
    const prod_class = await db.getProductivityClass(app_name, window_title, user_name);
    if (prod_class === null && app_name === 'Google Chrome') { 
      const predictedProdClass = ml.predictProductivityClass(window_title, user_name)
      res.send({
        source: predictedProdClass ? 'ml' : 'user',
        class: ml.predictProductivityClass(window_title, user_name)
      });
    } else {
      res.send({
        source: 'user',
        class: prod_class
      });
    }
  } catch(e) {
    res.send({
      source: 'user',
      class: null
    })
  }
});

app.post('/api/classifications', async (req, res) => {
  const result = await db.addOrChangeProductivity(req.body.params);

  try {
    const { queryResult, window_title, app_name, prod_class } = result;
    res.send(queryResult);
    const { learnProductivityClass, unlearnProductivityClass } = require('./learn/naiveBayes.js');
    if (result.old_prod_class && app_name === 'Google Chrome') { //recategorization
      unlearnProductivityClass(window_title, result.old_prod_class);
      learnProductivityClass(window_title, prod_class);
    } else if (app_name === 'Google Chrome') {
      learnProductivityClass(window_title, prod_class)
    }
    if (req.body.params.ml === 'affirm') {
      db.updateMachineLearningLog('affirm');
    } else if (req.body.params.wasML) {
      db.updateMachineLearningLog('reject');
    }
  } catch(e) {
    console.error(e)
    res.send('');
  }
});

app.delete('/api/classifications', async (req, res) => {
  const result = await db.deleteProductivityClass(req.body);
  
  try {
    const { queryResult, window_title, app_name, prod_class } = result;
    res.send(queryResult);
    if (queryResult.rowCount > 0 && app_name === 'Google Chrome') { 
      const { unlearnProductivityClass } = require('./learn/naiveBayes.js');
      unlearnProductivityClass(window_title, prod_class);
    }
  } catch(e) {
    console.error(e)
    res.send('');
  }
});

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


