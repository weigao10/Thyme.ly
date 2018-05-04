const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const { getTestData, stopMonitor } = require('./helpers/activityData.js');

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.get('/starttest', (req, res) => {
  getTestData(1000);
  console.log('started up activity monitor!');
  res.send('started up activity monitor!');
});

app.get('/stoptest', (req, res) => {
  stopMonitor();
  console.log('stopped activity monitor!');
  res.send('stopped activity monitor!');
});

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
