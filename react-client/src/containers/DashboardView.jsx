// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import { addActivity, patchActivity } from '../actions/activityActions'
import ActivityContainer from './ActivityContainer.jsx';
import ProductivityScore from './ProductivityScore.jsx';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
//import RaisedButton from 'material-ui/RaisedButton';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimerButton: true
    }

    this.connectMonitor = this.connectMonitor.bind(this);
    this.pauseMonitor = this.pauseMonitor.bind(this);
    this.toggleTimerButton = this.toggleTimerButton.bind(this);
    this.checkState = this.checkState.bind(this);
  }
  
  componentDidMount() {
    this.connectMonitor();
    axios.get('http://127.0.0.1:3000/api/activities')
      .then(res => console.log(res))
      .catch(err => console.log(err))
    ipcRenderer.on('activity', (event, message) => {
      console.log('message is', message);
      let inState = this.checkState(message)
      this.props.activityHandler(message, inState)
    });
  }

  connectMonitor() {
    this.connected = true;
    ipcRenderer.send('monitor', 'start');
  }

  pauseMonitor() {
    this.connected = false;
    ipcRenderer.send('monitor', 'pause');
  }

  toggleTimerButton() {
    // console.log('toggle!')
    let toggle = !this.state.showTimerButton;

    this.setState({
      showTimerButton: toggle
    })

    if (!toggle) {
      this.pauseMonitor();
    } else {
      this.connectMonitor();
    }
  }

  checkState (data) {
    for (let category in this.props.activities) {
      let activity = this.props.activities[category]
      for (let i = 0; i < activity.length; i++) {
        if (activity[i].title === data.title && activity[i].app === data.app) {
          return {
            'activity': activity[i],
            'category': category,
            'index': i
          }
        }
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <AppBar 
          title='Dashboard'
          style={{background: '#2196F3', margin: '0px'}}
          iconElementRight={this.state.showTimerButton ? <FlatButton label="Pause Tracker"/> : <FlatButton label="Restart Tracker" />}
          onRightIconButtonClick={this.toggleTimerButton}
        />
        <Paper style={{display: 'table', background: '#AAA', margin: '0', padding: '5px'}}>
          
          <ActivityContainer />
          
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities
})

const mapDispatchToProps = (dispatch) => {
  return {
    activityHandler: (data, inState) => {
      if (inState) dispatch(patchActivity(inState, data))
      else dispatch(addActivity(data))
    } 
  };
}
export default connect(mapStateToProps, mapDispatchToProps) (DashboardView)

