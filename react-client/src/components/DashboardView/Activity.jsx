import React from 'react';
import { connect } from 'react-redux';

const Activity = ({activities}) => (<div>
  {activities.activities.map((activity) => {
    return <div>app: {activity.app} <br/>
                window_title: {activity.title} &nbsp;
                </div>
  })}
</div>)


const mapStateToProps = state => ({
  activities: state.activities
})

export default connect(mapStateToProps)(Activity) 
