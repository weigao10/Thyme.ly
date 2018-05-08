const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

//update product class when cards are switched
app.patch('/activities', (req, res) => {
  // let newCategory = req.body.params.category;
  let newCategory = 'neutral';

  db.updateActivity(newCategory);
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//sockets

const io = require('socket.io')(server);
exports.io = io;
const {connectToSocket} = require('./helpers/activityData.js');
connectToSocket(1000);
//start up process that sends new activities to client via sockets
//1000 is the interval of the active window monitor