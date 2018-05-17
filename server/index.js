const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const session = require('express-session');
const partials = require('express-partials');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
// const memwatch = require('memwatch-next');
const chalk = require('chalk');

const db = require('./database/index.js');
const ml = require('./learn/naiveBayes.js');

app.use(bodyParser.json());

app.get('/api/classifications', (req, res) => {
  const {user_name, app_name, window_title} = req.query;
  if (!user_name) {
    res.send('no user attached to this session')
  }
  return db.getProductivityClass(app_name, window_title, user_name)
    .then((prod_class) => {
      // console.log(`prod_class is ${prod_class} and app_name is ${app_name}`) //seems to lag one behind??
      if (prod_class === null && app_name === 'Google Chrome') {
        ml.predictProductivityClass(window_title);
      }
      res.send(prod_class);
    })
    .catch((err) => res.send(err));
});

app.post('/api/classifications', (req, res) => {
  console.log( chalk.bold.white.bgBlue('inside /api/classifications'));

  if (!req.body.params.user_name) {
    res.send('no user attached to this session')
  }
  return db.addOrChangeProductivity(req.body.params)
    .then(message => {
      res.send(message)
    })
    .catch(err => console.log(err))
});

app.post('/api/deleteCard', (req, res) => {
  console.log( chalk.bold.white.bgBlue('inside /api/deleteCard'));

  return db.deleteProductivityClass(req.body.params)
    .then(message => res.send(message))
    .catch(err => console.log(err));
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


