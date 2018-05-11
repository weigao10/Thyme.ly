const { server } = require('../index.js');
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('socket connected!!');
});