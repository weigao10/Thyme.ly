import React from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import BalanceIcon from 'material-ui/svg-icons/action/account-balance';
import ComputerIcon from 'material-ui/svg-icons/hardware/computer';
import HourGlassIcon from 'material-ui/svg-icons/action/hourglass-empty';
import TrendingIcon from 'material-ui/svg-icons/action/trending-up';

const ViewSelector = (props) => {

  return (
    <Paper 
      zDepth={2}
      style={{marginBottom: '10px'}}
    >
      <Tabs 
        value={props.tabIndex} 
        onChange={props.handleTabChange}
      >
        <Tab 
          buttonStyle={buttonStyle} 
          label="Activity" 
          value={0} 
          icon={<ActionHome/>}
        />
        <Tab 
          buttonStyle={buttonStyle} 
          label="Analytics" 
          value={1} 
          icon={<TrendingIcon/>}
        />
        <Tab 
          buttonStyle={buttonStyle} 
          label="Pomodoro" 
          value={2} 
          icon={<HourGlassIcon/>}
        />
        <Tab 
          buttonStyle={buttonStyle} 
          label="Settings" 
          value={3} 
          icon={<ComputerIcon/>}
          />
      </Tabs>
    </Paper>
  )
}

const buttonStyle = {
  background: '#2196F3',
  color: 'white',
  font: 'Tahoma',
  fontSize: '110%',
  fontWeight: '900',
}

export default ViewSelector;