import React from 'react';
import Activity from './Activity.jsx'

const ActivityGroup = (props) => {
  // console.log('props', props.data.activities)
  return (<div>
  <Activity activities={props.activities}/>
</div>)}

export default ActivityGroup;