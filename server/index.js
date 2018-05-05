 const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

let server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
