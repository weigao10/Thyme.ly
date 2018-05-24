import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentFormat from 'moment-duration-format';
import clone from 'clone';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../constants.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// import DeleteIcon from ''

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

//make long pieces of text shorter and end with '...' 
const prettifier = (text) => {
  let results = text;

  if (results.length >= 30) {
    results = results.slice(0, 27) + '...';
  }
  
  return results;
}

const ActivityCard = (props) => {
  const { activity, category, deleteActivity, index, preferences, user, affirmCategorization } = props;
  
  let formattedDuration = moment.duration(activity.duration, "seconds").format("h[h] m[m] s[s]");

  let coreStyle = {
    font: 'Arial', 
    padding: '10px 5px 10px 5px',
    margin: '0px 5px 0px 5px',
    textAlign: 'left',
    background: 'white',
    color: 'black',
    fontSize: '80%',
  };

  let colorMap = {
    'productive': {tick: '#DCEDC8', tock: '#AED581' },
    'neutral': {tick: '#FFF9C4', tock: '#FFF176' },
    'distracting': {tick: '#FFCCBC', tock: '#FF8A65'}
  }

  if (index % 2 === 0) {
    coreStyle.background = colorMap[category]['tick'];
  } else {
    coreStyle.background = colorMap[category]['tock'];
  }

  const { connectDragSource, isDragging } = props;

  let isTracked;
  if (preferences.trackedApps.includes(activity.app)) {
    isTracked = true;
  } else {
    isTracked = false;
  }

    return connectDragSource(
      //React DnD requires components to be wrapped in a <div> and not <Paper>
      <div> 
        <Paper
          key={activity.title + index}
          style={coreStyle}
          zDepth={2}
        >
          <div>
            <b>{activity.app}</b>
            <i style={{float: 'right'}}>{formattedDuration}</i> 
          </div>

          <div style={{margin: '5px 0px 5px 0px'}}>
            <Divider style={{float: 'right', width: '100%', background: '#757575'}}/>
          </div>

          {activity.productivity.source === 'ml' ? <div>SUGGESTED BY THYME.LY<br/></div> : null}
          {isTracked ? 'Title: ' + prettifier(activity.title) : 'Application'} <br/>
         
          <br/>
          <button onClick={() => {deleteActivity(activity, category, isTracked, user)}}>🗑️</button>
            {activity.productivity.source === 'ml' ? (
          <button onClick={() => {affirmCategorization(activity, category, isTracked, user)}}>✔️
          </button>) : null}
        </Paper>
      </div>
    )
}

ActivityCard.propTypes = {
  activity: (props, propName, componentName) => {
    if (typeof props.activity.productivity !== 'object') {
      console.log('custom error incoming for activity', props.activity)
      return new Error(`
        Required prop "productivity" was not an object, instead it was ${props.activity.productivity}
      `)
    }
  }
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(ActivityCard);