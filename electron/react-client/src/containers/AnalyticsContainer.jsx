import { connect } from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {PieChart, Pie, Label} from 'recharts';
import {RadialBar, RadialBarChart, Legend} from 'recharts';
import {LineChart, XAxis, CartesianGrid, Line, Tooltip} from 'recharts';

import ChartTopRankings from '../components/AnalyticsView/ChartTopRankings.jsx';
import ActivityRadarChart from '../components/AnalyticsView/ActivityRadarChart.jsx';
import ActivityTreeMap from '../components/AnalyticsView/ActivityTreeMap.jsx';

class AnalyticsContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const data = [
      {name: 'productive', uv: 31.47, pv: 2400, fill: '#8884d8'},
      {name: 'neutral', uv: 26.69, pv: 4567, fill: '#83a6ed'},
      {name: 'distracting', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
    ];
    
    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px'
    };

    // console.error('productiveData is:', productiveData)
    return (
      <Paper style={stylePaper}>

      <Tabs inkBarStyle={{background: '#ffcc33'}} style={{height: '55px', width: '350px'}}>
        <Tab label='Pie Chart' style={styleRoot} buttonStyle={styleButton}>
          <ChartTopRankings activities={this.props.activities} />
        </Tab>

        <Tab label='Radar Chart' style={styleRoot} buttonStyle={styleButton}>
          <ActivityRadarChart activities={this.props.activities} />
        </Tab>

        <Tab label="Tree Map" style={styleRoot} buttonStyle={styleButton}>
          <ActivityTreeMap activities={this.props.activities} />
        </Tab>

      </Tabs>

      </Paper>
    )
  }

}

const styleRoot = {
  background: 'white',
  padding: '0px 3px 0px 3px',
  height: '25px'
};

const styleButton = {
  color: 'black',
  
  background: '#1DE9B6', 
  fontWeight: 'bold', 
  fontSize: '80%', 
  borderRadius: '6px 6px 0px 0px',
  height: '25px'
};

const stylePaper = {
  background: 'white',
  padding: '15px',
  minHeight: '550px',
  maxHeight: '550px',
  overflowY: 'scroll'
};

const mapStateToProps = (state) => {
  return {
    activities: state.activities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);

