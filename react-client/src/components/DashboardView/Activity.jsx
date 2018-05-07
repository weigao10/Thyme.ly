import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const renderActivities = (category, activities) => {

  return <div>
      <h4>{category}</h4>
      {activities[category].map(activity => {

        let duration = moment
          .duration(
            moment(activity.endTime, "MMMM Do YYYY, h:mm:ss a")
            .diff(moment(activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
          )
          .asSeconds();

        return <div>
            app: {activity.app} <br />
            window_title: {activity.title} <br />
            duration: {duration} seconds
          </div>;
      })}
    </div>;
}

const Activity = ({activities}) => {
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
