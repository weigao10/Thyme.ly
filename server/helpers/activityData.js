//file to get sample data chunks
const activeWin = require('active-win');
const moment = require('moment');
//closure variables
let activities = [];
let errors = [];

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

const monitor = async () => {
  try {
    let newActivity = assembleActivity(await activeWin());
    let lastActivity = activities[activities.length - 1];
    //check to see if a new activity chunk is needed or if the most recent chunk needs to be updated
    if (!lastActivity || (newActivity.app !== lastActivity.app
      || newActivity.title !== lastActivity.title)) {
      const time = timestamp();
      if (lastActivity) {
        lastActivity.endTime = time;
      }      
      newActivity.startTime = time;
      activities.push(newActivity);
    }
  } catch(e) {
    e.time = timestamp();
    e.description = e.message; //not sure why I need to do this
    errors.push(e); //TODO: this loses some info but full error objects apparently can't be stored in an array
  }
};

let intervalId; //closure variable for below functions
const startMonitor = (interval) => {
  activities = [];
  errors = [];
  intervalId = setInterval(monitor, interval);
};

const stopMonitor = () => {
  activities[activities.length - 1].endTime = timestamp();
  console.log('activities for this session are', JSON.stringify(activities));
  console.log('errors for this session are', JSON.stringify(errors));
  clearInterval(intervalId);
  return JSON.stringify(activities);
};

exports.startMonitor = startMonitor;
exports.stopMonitor = stopMonitor;