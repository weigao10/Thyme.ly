/*Leave this file running in the backgroud in Sublime text to get example data
printed in your console
*/
const activeWin = require('active-win');
const moment = require('moment');

let activities = [];
let errors = []; //NOT SURE IF ERROR IS DETECTED WHEN SCREEN JUST GOES BLANK

const timestamp = () => { //can change moment format for ease of manipulation
  return moment().format('MMMM Do YYYY, h:mm:ss a');
};

let counter = 0; //closure variable for monitor
const monitor = async () => {
  try {
    let activity = await activeWin();
    activity.time = timestamp();
    activities.push(activity);
    counter++;
    if (counter % 1000 === 0) { //control how often this prints to your console
      console.log('just assuring you that monitor is still running', activities);
    }
  } catch(e) {
    counter++;
    e.time = timestamp();
    console.log('error is', e);
    console.log('error message is', e.message);
    errors.push(JSON.stringify(e)); //TODO: this loses some info but full error objects apparently can't be stored in an array
    if (counter % 1000 === 0) {
      console.log('just assuring you that monitor is still running', errors);
    }
  }
};

let workerId; //closure variable for below functions
const getTestData = (interval) => {
  workerId = setInterval(monitor, interval);
};

const stopMonitor = () => {
  //assemble data ()
  //print activities and errors
  console.log('activities for this session are', JSON.stringify(activities));
  console.log('errors for this session are', JSON.stringify(errors));
  clearInterval(workerId);
};

exports.getTestData = getTestData;
exports.stopMonitor = stopMonitor;