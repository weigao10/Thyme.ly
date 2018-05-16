//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');
const { ipcMain, session } = require('electron');
const axios = require('axios');
const server = 'http://127.0.0.1:3000';
const url = 'https://test-aws-thymely.com';

const monitorActivity = (activities, errors, user) => {
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
    .then((lastActivity) => {
      const qs = {
        user_name: user, //CHANGE TO USERNAME
        app_name: lastActivity.app,
        window_title: lastActivity.title
      }
      return axios.get(server + '/api/classifications', {params: qs})
        .then((resp) => {
          return {
            ...lastActivity,
            productivity: resp.data || null
          };
        })
        .catch((err) => console.log(err))
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
  const title = stripEmoji(activeWinObj.title); // filter out the sound playing emoji
  return {
    id: activeWinObj.id,
    app: activeWinObj.owner.name,
    title, 
    startTime: timestamp()
  };
};

const stripEmoji = (title) => {
  // return title;
  const indexOfEmoji = title.indexOf('🔊'); //indicates a window is playing sound
  if (indexOfEmoji > -1) {
    const noEmoji = title.replace('🔊', '');
    return noEmoji.substring(0, noEmoji.length - 1);
 } else return title;
}

const needToInitializeChunk = (lastActivity) => {
  return !lastActivity;
};

const chunkComplete = (lastActivity, newActivity) => {
  if (needToInitializeChunk(lastActivity)) return false;
  return (lastActivity.app !== newActivity.app) || (lastActivity.title !== newActivity.title);
};

const startMonitor = (mainWindow, activities = [], errors = [], user = "test") => {
  return setInterval(() => {
    monitorActivity(activities, errors, user)
      .then((data) => {
        if (data) {
          mainWindow.sender.webContents.send('activity', data)
        }
      })
      .catch((err) => console.error('error in activity monitor', err))
  }, 1000)
}

exports.monitor = (mainWindow, mainSession) => {
  let intervalId = false;
  let activities = [];
  let errors = [];
  ipcMain.on('monitor', (mainWindow, event, message) => {
    if (event === 'start') {
      mainSession.cookies.get({name: 'userId', url}, (err, cookies) => {
        console.log('cookies inside monitor subroutine are', cookies);
        intervalId = startMonitor(mainWindow, activities, errors, cookies[0].value);
      });
       //add user here
    } else if (event === 'pause' && intervalId) {
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