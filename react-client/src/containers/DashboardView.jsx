// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ipcRenderer } from 'electron';

import { addActivity } from '../actions/activityActions'
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
  }
  
  componentDidMount() {
    this.connectMonitor();
  }

  connectMonitor() {
    this.connected = true;
    ipcRenderer.send('monitor', 'start');
    ipcRenderer.on('activity', (event, message) => {
      console.log(message);
    });
  }

  pauseMonitor() {
    this.connected = false;
    ipcRenderer.send('monitor', 'pause');
  }


  // connectSocket() {
  //   this.socket = window.io.connect('http://127.0.0.1:3000/');
  //   console.log('connected to socket!');
  //   this.socket.on('new chunk', (data) => {
  //     console.log('getting new activity chunk!', data);
  //     this.props.addActivity(data);
  //   });
  // }
  toggleTimerButton() {
    console.log('toggle!')
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

const mapDispatchToProps = dispatch => ({
  addActivity: addActivity
})

// export default withRouter(DashboardView);
export default connect(mapDispatchToProps, {addActivity}) (DashboardView)

