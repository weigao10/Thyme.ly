import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import moment from 'moment';

import ProductivityScore from '../../containers/ProductivityScore.jsx';
import {changeCategory} from '../../actions/activityActions';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const renderActivities = (category, activities, changeCategory) => {
  return (
    <div>

      <Paper 
        style={
          {font: 'Open Sans', 
          background: '#00BCD4', 
          padding: '10px 5px 10px 5px',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '115%'}}
      >
        {category[0].toUpperCase() + category.slice(1, category.length)}
      </Paper>
      {activities[category].map((activity, index) => {
        // let duration = moment
        //   .duration(
        //     moment(activity.endTime, "MMMM Do YYYY, h:mm:ss a")
        //     .diff(moment(activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
        //   )
        //   .asSeconds();
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
        return (
          <Paper
            key={activity.title + index}
            style={index % 2 === 0 ? styleTick : styleTock}
          >
            <b>{activity.app}</b> <br/>
            {activity.title} <br/>
            <i>{activity.duration}</i> seconds <br/>
            <br/>
            <button name="productive" onClick={(e) => {
                changeCategory(activity.id, category, 'productive')}
              }>productive</button>
            <button onClick={() => {changeCategory(activity.id, category, 'neutral')}}>neutral</button>
            <button onClick={() => {changeCategory(activity.id, category, 'distracting')}}>distracting</button>

          </Paper>
        )
      })}
    </div>
  );
}

const Activity = ({ activities, clickHandler }) => {
  const style = {
    margin: '8px',
    padding: '10px',
    width: 'calc(25% - 16px)',
    float: 'left',
    verticalAlign: 'top',
    minHeight: '525px',
    maxHeight: '525px',
    overflowY: 'scroll',
  }

  return (
    <div>
      <Paper style={style}>
        {renderActivities('productive', activities, clickHandler)}
      </Paper>
      <Paper style={style}>
        {renderActivities('neutral', activities, clickHandler)}
      </Paper>
      <Paper style={style}>
        {renderActivities('distracting', activities, clickHandler)}
      </Paper>
      <Paper style={style}>
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
    clickHandler: (id, oldCat, newCat) => {
      console.log('trying to dispatch!')
      if (oldCat !== newCat) dispatch(changeCategory(id, oldCat, newCat));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity) 
