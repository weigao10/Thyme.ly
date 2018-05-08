import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import React from 'react';
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DashboardView from './containers/DashboardView.jsx'


class App extends React.Component {
  
  render() {
    return(  
      <MuiThemeProvider>
        <Provider store={store}>
          <Router>
              <Route exact={true} path='/' component={ () => <DashboardView /> }/>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;