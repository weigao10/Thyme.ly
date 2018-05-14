const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database/index.js');
// const naiveBayes = require('./learn/naiveBayes.js');
const chalk = require('chalk');

// app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.get('/api/classifications', (req, res) => {
  const {user_name, app_name, window_title} = req.query;
  return db.getProductivityClass(app_name, window_title)
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
  console.log( chalk.bold.white.bgBlue('inside /api/classifications'));

  return db.addOrChangeProductivity(req.body.params)
    .then(message => res.send(message))
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

