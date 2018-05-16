const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const partials = require('express-partials');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./database/index.js');
// const naiveBayes = require('./learn/naiveBayes.js');

// app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret'
}));

const restrict = (req, res, next) => {
  if (req.session.auth) {
    console.log('user in session!')
    next();
  } else {
    console.log('user NOT in session!')
    next();
    // req.session.error = 'Access denied';
    // res.status(403).send('Access denied, please login');
  }
};

app.get('/api/classifications', (req, res) => {
  const {user_name, app_name, window_title} = req.query;
  return db.getProductivityClass(app_name, window_title, user_name)
    .then((prod_class) => {
      // console.log(`prod_class is ${prod_class} and app_name is ${app_name}`) //seems to lag one behind??
      // if (prod_class === null && app_name === 'Google Chrome') {
      //   naiveBayes.predictProducitivityClass(window_title);
      // }
      res.send(prod_class);
    })
    .catch((err) => res.send(err));
});

app.post('/api/classifications', (req, res) => {
  return db.addOrChangeProductivity(req.body.params)
    .then(message => res.send(message))
    .catch(err => console.log(err))
});

app.post('/login', (req, res) => {
  console.log('req user_id is', req.body.data);
  const googleUserId = req.body.data;
  //query the firebase DB to see if this is a real userId?
  // req.session.regenerate(() => {
  //   req.session.user = googleUserId;
  // })
  req.session.auth = googleUserId;
  res.send('ok')
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


