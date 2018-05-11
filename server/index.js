const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../database/index.js');

// app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.get('/api/classifications', (req, res) => {
  return db.getProductivityClass('messages', 'YYYO')
    .then((prod_class) => res.send(prod_class))
    .catch((err) => res.send(err));
})

app.get('/api/test', (req, res) => {
  return db.addOrChangeProductivity({
    user_name: 'brian',
    app_name: 'messages',
    window_title: 'YO',
    prod_class: 'distracting'
  })
    .then(message => res.send(message))
    .catch(err => console.log(err))
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

