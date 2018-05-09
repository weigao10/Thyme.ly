// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import React from 'react';
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import ActivityContainer from './containers/ActivityContainer.jsx'
import DashboardView from './containers/DashboardView.jsx'

class App extends React.Component {
  
  render() {
    // console.log('in app')
    return(  
      <MuiThemeProvider>
        <Provider store={store}>
        {/* <ActivityContainer /> */}
        <DashboardView />
          {/* <Router> */}
              {/* <Route exact={true} path='/' component={ () => <DashboardView /> }/> */}
            {/* <Route exact={true} path='/' component={ () => <ActivityContainer /> }/> */}
          {/* </Router> */}
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;