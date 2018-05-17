import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import { addActivity, patchActivity, setAllActivities } from '../actions/activityActions.js';
import { setUser } from '../actions/userActions.js';

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
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('sqlActivities', (event, message) => {
      this.props.setAllActivities(message)
    })
    ipcRenderer.on('activity', (event, message) => {
      let isTracked = this.props.preferences.trackedApps.includes(message.app)
      let inState = this.checkState(message, isTracked);
      this.props.activityHandler(message, inState);
    });
    
    ipcRenderer.once("windowClose", (event, message) => {
      let store = JSON.stringify({
        activities: this.props.activities,
        preferences: this.props.preferences
      })
      event.sender.send("store", store)
    })
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  connectMonitor(user) {
    if (this.connected === true) console.log('you tried to connect monitor when it was already connected')
    this.connected = true;
    ipcRenderer.send('monitor', 'start', user);
  }

  pauseMonitor() {
    if (this.connected === false) console.log('you tried to pause monitor when it was already paused')
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
      this.connectMonitor(this.props.user.user);
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
              'productivity': category,
              'index': i
            }
          }
        } else{
          if (activities[i].app === data.app) {
            return {
              'activity': activities[i],
              'productivity': category,
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
        <button onClick={this.logout}>Test logout button</button>
        {/* <pre>'current user is' {JSON.stringify(this.props.user)}</pre> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
  preferences: state.preferences,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    activityHandler: (data, inState) => {
      if (inState) dispatch(patchActivity(inState, data)) // add state.user here
      else dispatch(addActivity(data))
    },
    setAllActivities: (data) => {
      dispatch(setAllActivities(data));
    },
    setUser: (user) => {
      dispatch(setUser(user))
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
