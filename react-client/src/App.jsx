import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardView from './components/DashboardView.jsx'
import React from 'react';
import axios from 'axios';
import activeWin from 'active-win';
import moment from 'moment';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startMonitor = this.startMonitor.bind(this);
    this.stopMonitor = this.stopMonitor.bind(this);
  }

  startMonitor(){
    getTestData(1000);
    // axios.get('/starttest')
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  }

  stopMonitor(){
    axios.get('/stoptest')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button onClick={this.startMonitor}>Click to start monitoring</button>
        <button onClick={this.stopMonitor}>Click to stop monitoring</button>
      </div>
    )
  }
}

export default App;