const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../database/index.js');

// app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.get('/api/classifications', (req, res) => {
  const {user_name, app_name, window_title} = req.query;
  return db.getProductivityClass(app_name, window_title)
    .then((prod_class) => res.send(prod_class))
    .catch((err) => res.send(err));
})

app.post('/api/classifications', (req, res) => {
  // const { user_name, app_name, window_title, prod_class } = req.body
  // console.log('post request body is', req.body.params)
  return db.addOrChangeProductivity(req.body.params)
    .then(message => res.send(message))
    .catch(err => console.log(err))
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

