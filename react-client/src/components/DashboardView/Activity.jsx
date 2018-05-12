import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import moment from 'moment';
import momentFormat from 'moment-duration-format';
// import update from 'react-addons-update';
import clone from 'clone';

import ProductivityScore from '../../containers/ProductivityScore.jsx';
import {changeCategory} from '../../actions/activityActions';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const renderActivities = (category, activities, changeCategory) => {
  let sortedActivities = sortByDuration(activities)

  let styleCategory;
  if (category === 'productive') {
    styleCategory = styleCategoryP;
  } else if (category === 'neutral') {
    styleCategory = styleCategoryN;
  } else if (category === 'distracting') {
    styleCategory = styleCategoryD;
  }
  return (
    <div>
      <Paper style={styleCategory}>
        {category[0].toUpperCase() + category.slice(1, category.length)} &nbsp;
        <span style={
          {
            fontSize: "75%",
            fontStyle: "italic"
          }
        }>{getTotalDuration(sortedActivities[category])}</span>
      </Paper>
      {sortedActivities[category].map((activity, index) => {
        let formatDuration = moment.duration(activity.duration, "seconds").format("h[h], m[m] s[s]")
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
            <i>{formatDuration}</i> <br/>
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

const sortByDuration = (obj) => {
  let newObj = clone(obj)
  for(let key in newObj){
    if(Array.isArray(newObj[key])) {
      newObj[key].sort((a, b) => b.duration-a.duration)
    }
  }
  return newObj
}

const getTotalDuration = (activities) => {
  let duration = 0;
  activities.forEach((activity) => {
    duration += activity.duration;
  })
  let formatDuration = moment.duration(duration, "seconds").format("h[h], m[m] s[s]");
  return formatDuration;
}

const Activity = ({ activities, clickHandler }) => {

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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity) 

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