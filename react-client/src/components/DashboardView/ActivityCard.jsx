import React from 'react';
import moment from 'moment';
import momentFormat from 'moment-duration-format';
import clone from 'clone';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../constants.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const cardSource = {
  beginDrag(props) {
    return {
      activity: props.activity,
      oldCategory: props.category
    };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const ActivityCard = (props) => {
  const { activity, category, deleteActivity, index, preferences } = props;
  
  let formattedDuration = moment.duration(activity.duration, "seconds").format("h[h], m[m] s[s]");

  let styleTick = {
    font: 'Arial', 
    //background: '#E8F5E9', 
    background: '#DDD',
    padding: '10px 5px 10px 5px',
    margin: '10px 0px 10px 0px',
    textAlign: 'left',
    color: 'black',
    fontSize: '80%',
  };

  let styleTock = {
    font: 'Arial', 
    // background: '#C8E6C9', 
    background: '#BBB',
    padding: '10px 5px 10px 5px',
    margin: '10px 0px 10px 0px',
    textAlign: 'left',
    color: 'black',
    fontSize: '80%',
  };
  const { connectDragSource, isDragging } = props;

  if(preferences.trackedApps.includes(activity.app)){
    return connectDragSource(
      <div><Paper
        key={activity.title + index}
        style={index % 2 === 0 ? styleTick : styleTock}
      >
        <b>{activity.app}</b> <br/>
        {activity.title} <br/>
        <i>{formattedDuration}</i>
        <br/>
        <button onClick={() => {deleteActivity(activity.id, category)}}>delete</button>
      </Paper></div>
    )
  } else {
    return connectDragSource(
      <div><Paper
        key={activity.title + index}
        style={index % 2 === 0 ? styleTick : styleTock}
      >
        <b>{activity.app}</b> <br/>
        {/* don't display title if not in trackedApps */}
        <i>{formattedDuration}</i>
        <br/>
        <button onClick={() => {deleteActivity(activity.id, category)}}>delete</button>
      </Paper></div>
    )
  }  
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(ActivityCard);