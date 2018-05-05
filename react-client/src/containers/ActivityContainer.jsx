import React from 'react';
import { connect } from 'react-redux';
import { getActivities  } from '../../actions/activityActions.jsx';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx'

class ActivityContainer extends React.Component {
  
  componentDidMount() {
    this.props.getActivities();
  }

  render() {
    return (
      <div>
        <h3> ActivityContainer! </h3>
        <ActivityGroup activities={this.state.activities}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
})

export default connect(null, { getActivities })(ActivityContainer) 
// export default ActivityContainer;

const temp = [
  {'app': 'Chrome', 'title': 'Youtube', 'duration': '1'},
  {'app': 'Chrome', 'title': 'Netflix', 'duration': '2'},
  {'app': 'Chrome', 'title': 'Facebook', 'duration': '3'},
]