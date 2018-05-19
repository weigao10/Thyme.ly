import React from 'react';
import Paper from 'material-ui/Paper';
import {RadialBarChart, RadialBar, PieChart, Pie, Legend, Cell} from 'recharts';
import moment from 'moment';


class PomodoroContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(),
      data: [{name: 'Elapsed Time', value: 400},
             {name: 'Time Remaining', value: 300}]
    }
    this.elapseTime = this.elapseTime.bind(this);
  }

  elapseTime() {
    const [ elapsed, remaining ] = this.state.data;
    this.setState({
      data: [{name: 'Elapsed Time', value: ++elapsed.value},
             {name: 'Time Remaining', value: --remaining.value}]
    })
  }

  componentDidMount() {
    console.log('pomodoro mounted!')
    setInterval(this.elapseTime, 200);
  }

  render() {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const data02 = [{name: 'A1', value: 100},
    {name: 'A2', value: 300},
     {name: 'B1', value: 100},
     {name: 'B2', value: 80},
     {name: 'B3', value: 40},
     {name: 'B4', value: 30},
     {name: 'B5', value: 50},
     {name: 'C1', value: 100},
     {name: 'C2', value: 200},
     {name: 'D1', value: 150},
     {name: 'D2', value: 50}]
    
    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px'
    };

    return (
      <Paper style={stylePaper}>
        <PieChart width={800} height={400}>
          <Pie dataKey="value" data={data02} cx={200} cy={200} outerRadius={60} fill="#8884d8" paddingAngle={5}>
          {
          	data02.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)
          }
          </Pie>
          <Pie dataKey="value" data={this.state.data} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label>
            <Cell fill={'#ffffff'}/>
            <Cell fill={'#00C49F'}/>
          </Pie>
        </PieChart>
      </Paper>
    )
  }

}

let stylePaper = {
  background: '#EEE',
  padding: '15px',
  minHeight: '425px'
};

export default PomodoroContainer;