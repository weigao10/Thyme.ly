// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import { changeCategory, deleteActivity } from '../actions/activityActions'
import ProductivityScore from './ProductivityScore.jsx';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Paper style={{display: 'table', background: '#AAA', margin: '0', padding: '5px'}}>
          {/* create 3 activity groups */}
          <ActivityGroup />
        </Paper>
        <pre>{JSON.stringify(this.props.activities)}</pre>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => {
  return {
    clickHandler: (activity, oldCat, newCat) => {
      console.log('trying to dispatch!')
      if (oldCat !== newCat) dispatch(changeCategory(activity, oldCat, newCat));
    },
    deleteActivity: (id, category) => {
      console.log('trying to delete');
      dispatch(deleteActivity(id, category));
    }
  };
};

export default connect(mapStateToProps)(DashboardContainer);

