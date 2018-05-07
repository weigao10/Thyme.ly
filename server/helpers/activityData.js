//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');

//monitor function that runs on interval
const monitorSocket = async (socket) => {
  try {
    let newActivity = assembleActivity(await activeWin());
    let lastActivity = activities[activities.length - 1];
    if (needToInitializeChunk(lastActivity)) activities.push(newActivity);
    else if (chunkComplete(lastActivity, newActivity)) {
      lastActivity.endTime = timestamp();
      socket.emit('new chunk', {activity: lastActivity});
      activities.push(newActivity);
    }
  } catch(e) {
    e.time = timestamp();
    e.description = e.message; //not sure why I need to do this
    errors.push(e); //TODO: this loses some info but full error objects apparently can't be stored in an array
  }
};

const timestamp = () => { //can change moment format for ease of manipulation
  return moment().format('MMMM Do YYYY, h:mm:ss a');
};

const assembleActivity = (activeWinObj) => {
  return {
    id: activeWinObj.id,
    app: activeWinObj.owner.name,
    title: activeWinObj.title,
    startTime: timestamp()
  };
};

const needToInitializeChunk = (lastActivity) => {
  return !lastActivity;
};

const chunkComplete = (lastActivity, newActivity) => {
  if (needToInitializeChunk(lastActivity)) return false;
  return (lastActivity.app !== newActivity.app) || (lastActivity.title !== newActivity.title);
};

//functions that start, pause, and restart the monitor

const startSocketMonitor = (socket, interval) => {
  activities = [];
  errors = [];
  intervalId = setInterval(() => {monitorSocket(socket)}, interval);
  return intervalId;
};

const pauseSocketMonitor = (socket, intervalId) => {
  //emit the last activity and then clear interval
  // CAN BE OWN HALPER
  let lastActivity = activities[activities.length - 1];
  lastActivity.endTime = timestamp();
  console.log('last activity before pause is', {activity: lastActivity});
  socket.emit('new chunk', {activity: lastActivity});
  //HALPER
  clearInterval(intervalId);
};

//socket connection/controller

const {io} = require('../index.js');
const connectToSocket = (interval) => {
  io.on('connection', (socket) => {
    let intervalId = startSocketMonitor(socket, interval);
    //on disconnect, clear the interval and send the last chunk
    socket.on('pause', () => {
      console.log('socket detected a pause!');
      pauseSocketMonitor(socket, intervalId);
    });
    socket.on('restart', (socket) => {
      intervalId = startSocketMonitor(socket, interval);
    })
  });
};

exports.connectToSocket = connectToSocket;

//ideas for tests: make sure chunks are properly assembled by making sure it's not making a new chunk every second