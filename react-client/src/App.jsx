import { Provider } from 'react-redux'
import React from 'react';
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SwipeableViews from 'react-swipeable-views';

import MonitorContainer from './containers/MonitorContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import ViewSelector from './components/ViewSelector.jsx';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      tabIndex: 0
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tabIndex) {
    console.log('tab was clicked!', tabIndex);
    this.setState({
      tabIndex: tabIndex
    })
  }
  
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
        <ViewSelector tabIndex={this.state.tabIndex} handleTabChange={this.handleTabChange} />
      </Provider>
      </MuiThemeProvider>


      <MuiThemeProvider>
      <Provider store={store}>
        <SwipeableViews
          index={this.state.tabIndex}
          // onChangeIndex={this.handleChange}
        >
          <div>
              <DashboardContainer />
          </div>
        
          <div>
            {/* <AnalyticsContainer /> */}
          <strong>This is the Analytics Page and will be filled out soon</strong>
          </div>
          <div>
            {/* <UserSettingsContainer /> */}
          <strong>This is the User Settings Page and will be filled out soon</strong>
          </div>
        </SwipeableViews>
      </Provider>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default App;