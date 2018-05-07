import React from 'react';

const Activity = ({activities}) => {
  console.log('activities in activity.jsx', activities)
return (<div>
  {activities.activities.map((activity) => {
    return <div>app: {activity.app} <br/>
                window_title: {activity.title} &nbsp;
                </div>
  })}
</div>)}

export default Activity;