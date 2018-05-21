import React from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';

const ViewSelector = (props) => {

  return (
    //Render Tabs
    <Tabs contentContainerStyle={{margin: '2px', background: '#22AA22'}} value={props.tabIndex} onChange={props.handleTabChange}
      // onChange={this.props.handleTabChange}
      // value={this.props.tabIndex}
    >
      <Tab buttonStyle={buttonStyle} label="Activity" value={0} />
      <Tab buttonStyle={buttonStyle} label="Analytics" value={1} />
      <Tab buttonStyle={buttonStyle} label="Pomodoro Timer" value={2} />
      <Tab buttonStyle={buttonStyle} label="Settings" value={3} />
    </Tabs>
  )
}

const buttonStyle = {
  background: '#03A9F4',
  color: 'white',
  font: 'garamond',
  fontWeight: 'bold',
}

export default ViewSelector;