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
  const { activity, category, changeCategory, deleteActivity, index } = props;
  
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

  const handleClick = (e) => {
    changeCategory(activity, category, e.target.name)
  };
  const { connectDragSource, isDragging } = props;
  return connectDragSource(
    <div>
    <Paper
      key={activity.title + index}
      style={index % 2 === 0 ? styleTick : styleTock}
    >
      <b>{activity.app}</b> <br/>
      {activity.title} <br/>
      <i>{formattedDuration}</i>
      <strong onClick={() => {deleteActivity(activity.id, category)}}>&nbsp;-delete-</strong> <br/>
      <br/>
      <button name="productive" onClick={handleClick}>productive</button>
      <button name="neutral" onClick={handleClick}>neutral</button>
      <button name="distracting" onClick={handleClick}>distracting</button>
    </Paper>
    </div>
  )
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(ActivityCard);