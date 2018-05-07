import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';
window.io = io;

import ActivityContainer from './ActivityContainer.jsx';
import ProductivityScore from '../components/DashboardView/ProductivityScore.jsx';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = null;
    this.connectSocket = this.connectSocket.bind(this);
    this.pauseSocket = this.pauseSocket.bind(this);
  }
  
  componentDidMount() {
    this.connectSocket();
  }

  connectSocket() {
    this.socket = window.io.connect('http://127.0.0.1:3000/');
    console.log('connected to socket!');
    this.socket.on('new chunk', (data) => {
      console.log('getting new activity chunk!');
      console.log(data);
    });
  }

  pauseSocket() {
    this.socket.emit('pause');
  }

  render() {
    return (
      <div>
        <h3> Dashboard! </h3>
        <button onClick={this.pauseSocket}>test pause monitor button</button>
        <button onClick={this.connectSocket}>test restart monitor button</button>
        <ActivityContainer />
        <ProductivityScore />
      </div>
    )
  }
}

export default withRouter(DashboardView);