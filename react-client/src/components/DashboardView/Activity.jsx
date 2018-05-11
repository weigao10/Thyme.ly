import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import moment from 'moment';

import ProductivityScore from '../../containers/ProductivityScore.jsx';
import {changeCategory, deleteActivity} from '../../actions/activityActions';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const renderActivities = (category, activities, changeCategory, deleteActivity) => {

  //Set CSS Style depending on category
  let styleCategory;
  if (category === 'productive') {
    styleCategory = styleCategoryP;
  }
  if (category === 'neutral') {
    styleCategory = styleCategoryN;
  }
  if (category === 'distracting') {
    styleCategory = styleCategoryD;
  }

  return (
    <div>
      <Paper style={styleCategory}>
        {category[0].toUpperCase() + category.slice(1, category.length)}
      </Paper>
      {activities[category].map((activity, index) => {
        // let duration = moment
        //   .duration(
        //     moment(activity.endTime, "MMMM Do YYYY, h:mm:ss a")
        //     .diff(moment(activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
        //   )
        //   .asSeconds();
        return (
          <Paper
            key={activity.title + index}
            style={index % 2 === 0 ? styleTick : styleTock}
          >
            <b>{activity.app}</b> <br/>
            {activity.title} <br/>
            <i>{activity.duration}</i> seconds 
            <strong onClick={() => {deleteActivity(activity.id, category)}}>&nbsp;-delete-</strong> <br/>
            <br/>
            <button name="productive" onClick={(e) => {
                changeCategory(activity, category, 'productive')}
              }>productive</button>
            <button onClick={() => {changeCategory(activity, category, 'neutral')}}>neutral</button>
            <button onClick={() => {changeCategory(activity, category, 'distracting')}}>distracting</button>

          </Paper>
        )
      })}
    </div>
  );
}

const Activity = ({ activities, clickHandler, deleteActivity }) => {

  return (
    <div>
      <Paper style={style}>
        {renderActivities('productive', activities, clickHandler, deleteActivity)}
      </Paper>
      <Paper style={style}>
        {renderActivities('neutral', activities, clickHandler, deleteActivity)}
      </Paper>
      <Paper style={style}>
        {renderActivities('distracting', activities, clickHandler, deleteActivity)}
      </Paper>
      <Paper style={styleScore}>
        <ProductivityScore />
      </Paper>
    </div>
  )
}



const mapStateToProps = state => ({
  activities: state.activities
})

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
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity) 

//CSS Styles for Material UI Components

let styleTick = {
  font: 'Arial', 
  //background: '#E8F5E9', 
  background: '#DDD',
  padding: '10px 5px 10px 5px',
  margin: '10px 0px 10px 0px',
  textAlign: 'left',
  color: 'black',
  fontSize: '80%',
}
let styleTock = {
  font: 'Arial', 
  // background: '#C8E6C9', 
  background: '#BBB',
  padding: '10px 5px 10px 5px',
  margin: '10px 0px 10px 0px',
  textAlign: 'left',
  color: 'black',
  fontSize: '80%',
}

let styleCategoryP = {
  font: 'Open Sans', 
  background: '#43A047', 
  padding: '10px 5px 10px 5px',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '115%',
  onMouseOver: '#FFF'
};

let styleCategoryN = {
  font: 'Open Sans', 
  background: '#00BCD4', 
  padding: '10px 5px 10px 5px',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '115%',
  onMouseOver: '#FFF'
};

let styleCategoryD = {
  font: 'Open Sans', 
  background: '#FF5722', 
  padding: '10px 5px 10px 5px',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '115%',
  onMouseOver: '#FFF'
};

const style = {
  margin: '8px',
  padding: '10px',
  width: 'calc(25% - 16px)',
  float: 'left',
  verticalAlign: 'top',
  minHeight: '475px',
  maxHeight: '475px',
  overflowY: 'scroll',
  background: '#E0F2F1'
}

const styleScore = {
  margin: '8px',
  padding: '10px',
  width: 'calc(25% - 16px)',
  float: 'left',
  verticalAlign: 'top',
  minHeight: '475px',
  maxHeight: '475px',
  background: '#E0F2F1'
}
