import React from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import AlarmIcon from '@material-ui/icons/Alarm';

const ViewSelector = (props) => {

  return (
    <Tabs 
      zDepth={3}
      value={props.tabIndex} 
      onChange={props.handleTabChange}
    >
      <Tab buttonStyle={buttonStyle} label="Activity" value={0}>
        <AlarmIcon/>
      </Tab>
      <Tab buttonStyle={buttonStyle} label="Analytics" value={1} />
      <Tab buttonStyle={buttonStyle} label="Pomodoro Timer" value={2} />
      <Tab buttonStyle={buttonStyle} label="Settings" value={3} />
    </Tabs>
  )
}

const buttonStyle = {
  background: '#2196F3',
  color: 'white',
  font: 'Tahoma',
  fontSize: '115%',
  fontWeight: 'bold',
}

export default ViewSelector;