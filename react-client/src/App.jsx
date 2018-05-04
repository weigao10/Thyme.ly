import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardView from './components/DashboardView.jsx'
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startMonitor = this.startMonitor.bind(this);
    this.stopMonitor = this.stopMonitor.bind(this);
  }

  startMonitor(){
    axios.get('/starttest')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  stopMonitor(){
    axios.get('/stoptest')
      .then(res => console.log(res))
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