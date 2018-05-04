import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';

import ActivityContainer from './ActivityContainer.jsx';
import ProductivityScore from '../components/DashboardView/ProductivityScore.jsx';

class DashboardView extends React.Component {
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
        <h3> Dashboard! </h3>
        <ActivityContainer />
        <ProductivityScore />
      </div>
    )
  }
}

export default withRouter(DashboardView);