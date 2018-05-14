import { connect } from 'react-redux';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs'
//import RaisedButton from 'material-ui/RaisedButton';

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
      const inState = this.checkState(message);
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
    console.log('start!')
  }

  pauseMonitor() {
    this.connected = false;
    ipcRenderer.send('monitor', 'pause');
    console.log('paused')
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
      // TODO: Move this to another component (first have to move pause/not paused state to store)
      <div>
        <AppBar 
            title='Dashboard'
            style={{background: '#2196F3', margin: '0px'}}
            iconElementRight={this.state.showTimerButton ? <FlatButton label="Pause Tracker"/> : <FlatButton label="Restart Tracker" />}
            onRightIconButtonClick={this.toggleTimerButton}
          />
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Activity" value={0} />
          <Tab label="Daily Report" value={1} />
          <Tab label="Another Report" value={2} />
        </Tabs>

        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities
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

/*

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>

            <Paper style={{display: 'table', background: '#AAA', margin: '0', padding: '5px'}}>
          
            <DashboardContainer />
      
        </Paper>
      </div>
      <div style={styles.slide}>
        slide n°2
      </div>
      <div style={styles.slide}>
        slide n°3
      </div>
    </SwipeableViews>

    */
