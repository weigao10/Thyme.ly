import React from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';

const ViewSelector = (props) => {

  return (
    //Render Tabs
    <Tabs value={props.tabIndex} onChange={props.handleTabChange}
      // onChange={this.props.handleTabChange}
      // value={this.props.tabIndex}
    >
      <Tab label="Activity" value={0} />
      <Tab label="Analytics" value={1} />
      <Tab label="Pomodoro Timer" value={2} />
      <Tab label="Settings" value={3} />
    </Tabs>
  )
}

export default ViewSelector;