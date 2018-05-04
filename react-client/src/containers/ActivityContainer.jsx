import React from 'react';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx'

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: temp
    }
  }
  
  componentDidMount() {
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
export default ActivityContainer;

const temp = [
  {'app': 'Chrome', 'title': 'Youtube', 'duration': '1'},
  {'app': 'Chrome', 'title': 'Netflix', 'duration': '2'},
  {'app': 'Chrome', 'title': 'Facebook', 'duration': '3'},
]