import { Provider } from 'react-redux'
import React from 'react';
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MonitorContainer from './containers/MonitorContainer.jsx';
import DashboardView from './containers/DashboardView.jsx';

class App extends React.Component {
  
  render() {
    return(
      <div>  
      <MuiThemeProvider>
      <Provider store={store}>
          <MonitorContainer />
      </Provider>
      </MuiThemeProvider>

      <MuiThemeProvider>
      <Provider store={store}>
        <DashboardView />
      </Provider>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default App;