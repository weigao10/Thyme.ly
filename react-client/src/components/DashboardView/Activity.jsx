import React from 'react';

const Activity = (props) => (<div>
  {props.activities.map((activity) => {
    return <div>{activity.app} <br/>
                {activity.title} &nbsp;
                {activity.duration} mins</div>
  })}
</div>)

export default Activity;