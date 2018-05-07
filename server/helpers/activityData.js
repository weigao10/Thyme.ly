//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');

//closure variables to store activities and errors
let activities = [];
let errors = [];

//functions that start, pause, and restart the monitor
const startSocketMonitor = (socket, interval) => {
  let storage = { //point to closure variables
    activities,
    errors
  };
  return setInterval(() => {monitorSocket(socket, storage)}, interval);
};

const pauseSocketMonitor = (socket, intervalId) => {
  //emit the last activity and then clear interval
  let lastActivity = activities[activities.length - 1]; //HOW CAN I ACCESS THIS WO CLOSURE?
  lastActivity.endTime = timestamp();
  socket.emit('new chunk', {activity: lastActivity});
  clearInterval(intervalId);
};

//monitor function that runs on interval
const monitorSocket = async (socket, { activities, errors }) => {
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
    e.description = e.message;
    errors.push(e); //TODO: this loses some info but full error objects apparently can't be stored in an array
  }
};

const timestamp = () => {
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

/*
ideas for tests:
make sure chunks are properly assembled by making sure it's not making a new chunk every second
make sure entire time period is covered by chunks
*/