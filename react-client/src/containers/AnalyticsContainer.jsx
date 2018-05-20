import React from 'react';
import Paper from 'material-ui/Paper';
import {RadialBar, RadialBarChart, Legend} from 'recharts';
import {LineChart, XAxis, CartesianGrid, Line, Tooltip} from 'recharts';

class AnalyticsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

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

    return (
      <div>hi</div>
      // <Paper style={stylePaper}>
      //   <h3>Radial Bar</h3>
      //   <RadialBarChart width={500} height={300} cx={100} cy={100} innerRadius={10} outerRadius={120} barSize={20} data={data}>
      //   <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv'/>
      //   </RadialBarChart>

      //   <h3>Line Chart</h3>
      //   <LineChart
      //     width={400}
      //     height={400}
      //     data={data}
      //     margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      //   >
      //     <XAxis dataKey="name" />
      //     <Tooltip />
      //     <CartesianGrid stroke="#f5f5f5" />
      //     <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
      //     <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      //   </LineChart>
      // </Paper>
    )
  }

}



let stylePaper = {
  background: '#EEE',
  padding: '15px',
  minHeight: '425px'
}
export default AnalyticsContainer;