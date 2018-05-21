import { connect } from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {PieChart, Pie, Label} from 'recharts';
import {RadialBar, RadialBarChart, Legend} from 'recharts';
import {LineChart, XAxis, CartesianGrid, Line, Tooltip} from 'recharts';

class AnalyticsContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let { productive } = this.props.activities;
    productive = productive.sort();

    let productiveData = [];

    // console.log('props.activities in Analytics Container is', productive);
    
    if (productive.length > 0) {
      for (var i = 0; i < productive.length; i++) {
        productiveData.push({
          name: productive[i].title,
          duration: productive[i].duration
        });

        if (i === 4) break;
      }
    }

    let { distracting } = this.props.activities;
    distracting = distracting.sort();

    let distractingData = [];

    if (distracting.length > 0) {
      for (var i = 0; i < distracting.length; i++) {
        distractingData.push({
          name: distracting[i].title,
          duration: distracting[i].duration
        });

        if (i === 4) break;
      }
    }

    

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

      <Tabs>
        <Tab label='Pie Chart'>

            <h3>Top 5 Productive Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={productiveData} 
                dataKey="duration" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity)=> `${activity.name}`}
              >
                
              </Pie>
          
            </PieChart>

            <h3>Top 5 Distracting Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={distractingData} 
                dataKey="duration" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity)=> `${activity.name}`}
              >
                
              </Pie>
          
            </PieChart>

        </Tab>

        <Tab label='chart2'>
        <h3>Line Chart</h3>
        <LineChart
          width={300}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>
        </Tab>

        <Tab label="chart3"/>

      </Tabs>

        

        
      </Paper>
    )
  }

}



let stylePaper = {
  background: 'white',
  padding: '15px',
  minHeight: '550px',
  maxHeight: '550px',
  overflowY: 'scroll'
}

const mapStateToProps = (state) => {
  return {
    activities: state.activities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);

