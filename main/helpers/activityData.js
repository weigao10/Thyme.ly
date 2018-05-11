//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');
const { ipcMain } = require('electron');

const monitorActivity = (activities, errors) => {
  return activeWin()
    .then((data) => {
      let newActivity = assembleActivity(data);
      let lastActivity = activities[activities.length - 1];
      if (needToInitializeChunk(lastActivity)) activities.push(newActivity);
      else if (chunkComplete(lastActivity, newActivity)) {
        lastActivity.endTime = timestamp();
        activities.push(newActivity);
        return lastActivity;
      }
    })
    .catch((e) => {
      e.time = timestamp();
      e.description = e.message;
      errors.push(e); //TODO: this loses some info but full error objects apparently can't be stored in an array
    })
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

const startMonitor = (mainWindow, activities = [], errors = []) => {
  return setInterval(() => {
    monitorActivity(activities, errors)
      .then((data) => {
        if (data) {
          // console.log(data);
          mainWindow.sender.webContents.send('activity', data)
        }
      })
      .catch((err) => console.error('error in activity monitor', err))
  }, 1000)
}

exports.monitor = (mainWindow) => {
  let intervalId = false;
  let activities = [];
  let errors = [];
  ipcMain.on('monitor', (mainWindow, event, message) => {
    if (event === 'start') {
      // console.log('main is trying to start monitor')
      intervalId = startMonitor(mainWindow, activities, errors);
    } else if (event === 'pause' && intervalId) {
      // console.log('main is trying to clear monitor')
      clearInterval(intervalId);
      intervalId = false;
    } else {
      console.error('activity monitor did not understand instruction', event, message);
    }
  });
};

/*
ideas for tests:
make sure chunks are properly assembled by making sure it's not making a new chunk every second
make sure entire time period is covered by chunks
*/