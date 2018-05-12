import React from 'react';
import clone from 'clone';
import moment from 'moment';
import momentFormat from 'moment-duration-format';

import ActivityCard from './ActivityCard.jsx';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const ActivityGroup = ({ category, activities, changeCategory, deleteActivity, style }) =>  {
  // activities is a group for a category
  let sortedActivities = sortByDuration(activities)
  // sorting doesnt seem to work!
  return (
    <div>
      <Paper style={styleMap[category]}>
      {/* <Paper> */}
        {renderActivities(category, sortedActivities, changeCategory, deleteActivity)}
      </Paper>
    </div>
  )
}

const renderActivities = (category, activities, changeCategory, deleteActivity) => {
  console.log('change categories inside render activities is', changeCategory)
  return (
    <div>
      <Paper>
        {category[0].toUpperCase() + category.slice(1, category.length)} &nbsp;
        <span style={
          {
            fontSize: "75%",
            fontStyle: "italic"
          }
        }>{getTotalDuration(activities)}</span>
      </Paper>
      {activities.map((activity, index) => {
       return (
        <ActivityCard 
          activity={activity}
          index={index}
          category={category}
          changeCategory={changeCategory}
          deleteActivity={deleteActivity}
        />
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

let styleCategoryP = {
  font: 'Open Sans',
  background: '#43A047',
  padding: '10px 5px 10px 5px',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '115%',
  onMouseOver: '#FFF',
  borderRadius: '15px 15px 0px 0px'
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
 };
 
 const styleScore = {
  margin: '8px',
  padding: '10px',
  width: 'calc(25% - 16px)',
  float: 'left',
  verticalAlign: 'top',
  minHeight: '475px',
  maxHeight: '475px',
  background: '#E0F2F1'
 };

 const styleMap = {
   'productive': styleCategoryP,
   'neutral': styleCategoryN,
   'distracting': styleCategoryD
 };

 export default ActivityGroup;