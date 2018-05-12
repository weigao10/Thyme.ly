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
    const {activities, changeCategory, deleteActivity } = this.props;
    return (
      <div>
        <Paper style={{display: 'table', background: '#AAA', margin: '0', padding: '5px'}}>
          <ActivityGroup
            category='productive'
            activities={activities.productive}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
          />
          <ActivityGroup
            category='neutral'
            activities={activities.neutral}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
          />
          <ActivityGroup
            category='distracting'
            activities={activities.distracting}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
          />
        </Paper>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (activity, oldCat, newCat) => {
      if (oldCat !== newCat) dispatch(changeCategory(activity, oldCat, newCat));
    },
    deleteActivity: (id, category) => {
      dispatch(deleteActivity(id, category));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

