import React from 'react';
import { connect } from 'react-redux';
import { getActivities  } from '../actions/activityActions.js'
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx'

class ActivityContainer extends React.Component {
  
  componentDidMount() {
    this.props.getActivities();
  }

  render() {
    return (
      <div>
        <h3> ActivityContainer! </h3>
        <ActivityGroup activities={this.props.activities}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.activities //from index.js (root reducer)
})

export default connect(mapStateToProps, { getActivities })(ActivityContainer) 
// export default ActivityContainer;