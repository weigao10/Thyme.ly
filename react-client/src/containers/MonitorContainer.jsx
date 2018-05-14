import { connect } from 'react-redux';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import { addActivity, patchActivity} from '../actions/activityActions.js';

class MonitorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimerButton: true,
      slideIndex: 0
    }

    this.connectMonitor = this.connectMonitor.bind(this);
    this.pauseMonitor = this.pauseMonitor.bind(this);
    this.checkState = this.checkState.bind(this);
    this.toggleTimerButton = this.toggleTimerButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.connectMonitor();
    ipcRenderer.on('activity', (event, message) => {
      //check if in trackedApps and title and app match something in state OR
        //update duration
      //else if title matches something in state
        //check if 
      let isTracked = this.props.preferences.trackedApps.includes(message.app)
      let inState = this.checkState(message, isTracked);
      this.props.activityHandler(message, inState);
    });
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  connectMonitor() {
    this.connected = true;
    ipcRenderer.send('monitor', 'start');
  }

  pauseMonitor() {
    this.connected = false;
    ipcRenderer.send('monitor', 'pause');
  }

  toggleTimerButton() {
    let toggle = !this.state.showTimerButton;
    this.setState({
      showTimerButton: toggle
    });
    if (!toggle) {
      this.pauseMonitor();
    } else {
      this.connectMonitor();
    }
  }

  checkState (data, isTracked) {
    for (let category in this.props.activities) {
      let activities = this.props.activities[category]

      for (let i = 0; i < activities.length; i++) {
        if(isTracked){
          if (activities[i].title === data.title && activities[i].app === data.app) {
            return {
              'activity': activities[i],
              'category': category,
              'index': i
            }
          }
        } else{
          if (activities[i].app === data.app) {
            return {
              'activity': activities[i],
              'category': category,
              'index': i
            }
          }
        }
      }
    }
    return false;
  }

  render() {
    return (
      // TODO: Make this component render a Pause/Start timer button
      <div>
    
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => {
  return {
    activityHandler: (data, inState) => {
      if (inState) dispatch(patchActivity(inState, data))
      else dispatch(addActivity(data))
    } 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorContainer);

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
