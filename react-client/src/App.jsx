import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import React from 'react';
import store from './store'

import DashboardView from './containers/DashboardView.jsx'


class App extends React.Component {
  
  render() {
    return(  <Provider store={store}><div>
        <Router>
          <div>
            <Route exact={true} path='/' component={ () => <DashboardView /> }/>
          </div>
        </Router>
      </div></Provider>
    )
  }
}

export default App;