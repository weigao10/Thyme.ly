import React from 'react';
import { connect } from 'react-redux';

const renderActivities = (category, activities) => {
  return (
    <div>
      <h4>{category}</h4>
      {activities[category].map((activity) => {
        return <div>
          app: {activity.app} <br/>
          window_title: {activity.title} &nbsp;
        </div>
      })}
    </div>
  )
}

const Activity = ({activities}) => {
  console.log('activities in activity.jsx', activities)
  return (
    <div>
      {renderActivities('neutral', activities)}
      {renderActivities('productive', activities)}
      {renderActivities('distracting', activities)}
    </div>
  )
}


const mapStateToProps = state => ({
  activities: state.activities
})

export default connect(mapStateToProps)(Activity) 
