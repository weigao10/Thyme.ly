import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import { changeCategory, deleteActivity } from '../actions/activityActions'
// import ProductivityScore from './ProductivityScore.jsx';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx';

import Paper from 'material-ui/Paper';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {activities, changeCategory, deleteActivity, preferences } = this.props;
    return (
        <Paper style={{display: 'table', background: '#AAA', margin: '0', padding: '5px', width: '75%', minHeight: '500px', maxHeight: '550px', overflowY: 'scroll', verticalAlign: 'top'}}>
          <ActivityGroup
            category='productive'
            activities={activities.productive}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}

          />
          <ActivityGroup
            category='neutral'
            activities={activities.neutral}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}
          />
          <ActivityGroup
            category='distracting'
            activities={activities.distracting}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}
          />
        </Paper>
    )
  }
};

const mapStateToProps = (state) => ({
  activities: state.activities,
  preferences: state.preferences
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (activity, oldCat, newCat) => {
      if (oldCat !== newCat) dispatch(changeCategory(activity, oldCat, newCat));
    },
    deleteActivity: (activity, category, isTracked) => {
      console.log('dispatching deleteActivity and isTracked is:', isTracked)
      dispatch(deleteActivity(activity, category, isTracked));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

