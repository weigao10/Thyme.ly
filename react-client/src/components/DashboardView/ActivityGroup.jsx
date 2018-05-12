import React from 'react';
import Activity from './Activity.jsx'

const ActivityGroup = () =>  (<div>
  <Activity/>
</div>)

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

export default ActivityGroup;