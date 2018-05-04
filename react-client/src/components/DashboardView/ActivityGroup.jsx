import React from 'react';
import Activity from './Activity.jsx'

const ActivityGroup = (props) => (<div>
  <Activity activities={props.activities}/>
</div>)

export default ActivityGroup;