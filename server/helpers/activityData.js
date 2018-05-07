//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');

const timestamp = () => { //can change moment format for ease of manipulation
  return moment().format('MMMM Do YYYY, h:mm:ss a');
};

const assembleActivity = (activeWinObj) => {
  return {
    id: activeWinObj.id,
    app: activeWinObj.owner.name,
    title: activeWinObj.title
  };
};

const needToInitializeChunk = (lastActivity) => {
  return !lastActivity;
};

const chunkComplete = (lastActivity, newActivity) => {
  if (needToInitializeChunk(lastActivity)) return false;
  return (lastActivity.app !== newActivity.app) || (lastActivity.title !== newActivity.title);
};

const monitorSocket = async (socket) => {
  try {
    let newActivity = assembleActivity(await activeWin());
    let lastActivity = activities[activities.length - 1];
    if (needToInitializeChunk(lastActivity)) {
      newActivity.startTime = timestamp();
      activities.push(newActivity);
    } else if (chunkComplete(lastActivity, newActivity)) {
      lastActivity.endTime = timestamp();
      socket.emit('new chunk', {activity: lastActivity});
      newActivity.startTime = timestamp();
      activities.push(newActivity);
    }
  } catch(e) {
    e.time = timestamp();
    e.description = e.message; //not sure why I need to do this
    errors.push(e); //TODO: this loses some info but full error objects apparently can't be stored in an array
  }
};

const startSocketMonitor = (socket, interval) => {
  activities = [];
  errors = [];
  intervalId = setInterval(() => {monitorSocket(socket)}, interval);
};

//create a pause fn

const pauseMonitor = () => {
  activities[activities.length - 1].endTime = timestamp();
  console.log('activities for this session are', JSON.stringify(activities));
  console.log('errors for this session are', JSON.stringify(errors));
  clearInterval(intervalId);
  return JSON.stringify(activities);
};

const {io} = require('../index.js');
const connectToSocket = (interval) => {
  io.on('connection', (socket) => {
    startSocketMonitor(socket, interval);
    //on disconnect, clear the interval and send any remaining data
  });
};

exports.connectToSocket = connectToSocket;