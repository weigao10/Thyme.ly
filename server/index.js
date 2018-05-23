const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const partials = require('express-partials');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
const chalk = require('chalk');

const db = require('./database/index.js');
const scrapeDb = require('./database/scraper.js');
const ml = require('./learn/naiveBayes.js');

ml.initClassifier();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './splash-client/dist')));
//middleware

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

app.use('/api/classifications', (req, res, next) => {
  //TODO: ADD JSON TOKEN VERIFICATION
  next();
});

//api
app.get('/api/classifications', (req, res) => {
  //MAIN FILE NEEDS ACCESS TO 'IS TRACKED'
  const {user_name, app_name, window_title} = req.query;
  if (!user_name) { //refactor to be middleware
    console.log(chalk.blue('NO USER NAME!'))
    console.log('req.query is', req.query)
    res.send('no user attached to this session')
  }
  return db.getProductivityClass(app_name, window_title, user_name)
    .then((prod_class) => {
      if (prod_class === null && app_name === 'Google Chrome') { //add other tracked app
        const predictedProdClass = ml.predictProductivityClass(window_title, user_name)
        console.log('predicted prod is', predictedProdClass);
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
    })
    .catch((err) => res.send(err));
});

app.post('/api/classifications', (req, res) => {
  if (!req.body.params.user_name) {
    console.log('req.body.params is', req.body.params)
    console.log(chalk.blue('NO USER NAME!'))
    res.send('no user attached to this session')
  }
  console.log(chalk.blue('req.body.params is', JSON.stringify(req.body.params)));
  return db.addOrChangeProductivity(req.body.params)
    .then(message => {
      res.send(message)
    })
    .catch(err => console.log(err))
});

app.delete('/api/classifications', (req, res) => {
  console.log(chalk.blue('getting a delete request for', JSON.stringify(req.body)));
  if (!req.body.user_name) {
    console.log(chalk.blue('NO USER NAME!'))
    res.send('no user attached to this session')
  }
  return db.deleteProductivityClass(req.body)
    .then(message => res.send(message))
    .catch(err => console.log(err));
});

app.get('/learn/scrape', (req, res) => {
  scrapeDb.addScrapingResults()
});

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


