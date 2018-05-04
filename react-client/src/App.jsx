import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardView from './components/DashboardView.jsx'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return ( <div>we haz webpack</div>
      // <div>
      //   <Router>
      //     <div>
      //       <Route exact={true} path='/' component={(props) => <DashboardView /> }/>
      //       {/* <Route path='/registration' component={(props) => <RegistrationPage /> }/> */}
      //     </div>
      //   </Router>
      // </div>
    )
  }
}

export default App;