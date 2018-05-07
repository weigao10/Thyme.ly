import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';
window.io = io;

import { postActivities } from '../actions/activityActions'
import ActivityContainer from './ActivityContainer.jsx';
import ProductivityScore from '../components/DashboardView/ProductivityScore.jsx';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.connectSocket = this.connectSocket.bind(this);
  }
  
  componentDidMount() {
    this.connectSocket();
  }

  connectSocket() {
    this.socket = window.io.connect('http://127.0.0.1:3000/');
    console.log('connected to socket!');
    this.socket.on('new activity', (data) => {
      
      console.log('getting new activity!');
      console.log(data);
      this.props.postActivities(data);
    });
  }

  render() {
    return (
      <div>
        <h3> Dashboard! </h3>
        <ActivityContainer activities={this.props.activities}/>
        <ProductivityScore />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities
})

const mapDispatchToProps = dispatch => ({
  postActivities: postActivities
})

// export default withRouter(DashboardView);
export default connect(mapDispatchToProps, {postActivities}) (withRouter (DashboardView))

