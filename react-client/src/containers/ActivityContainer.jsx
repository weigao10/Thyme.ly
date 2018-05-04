import React from 'react';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx'

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h3> ActivityContainer! </h3>
        <ActivityGroup />
      </div>
    )
  }
}
export default ActivityContainer;