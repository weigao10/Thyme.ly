const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  console.log('just seeing how webpack-dev-server works');
  res.send('test');
})

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
