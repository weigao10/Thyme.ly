import { connect } from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper';
import {RadialBarChart, RadialBar, PieChart, Pie, Legend, Cell} from 'recharts';
import moment from 'moment';

import { startPom, pausePom, resumePom, clearPom, completeSpurt } from '../actions/pomodoroActions';

class PomodoroContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //local state, everything else is in the store
      timerIntervalId: null,
      elapsedTime: 0,
      currentSpurtLength: 50 //this should come from redux?
    }
    this.elapseTime = this.elapseTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.skipAhead = this.skipAhead.bind(this);
  }

  elapseTime() {
    if (this.state.elapsedTime >= this.state.currentSpurtLength) {
      // console.log('FINISHED POM SPURT OF', this.props.pomodoro.currentSpurt.type);
      this.props.completeSpurt();
      // console.log('NOW ON SPURT', this.props.pomodoro.currentSpurt)
      this.setState({elapsedTime: 0}) //also need to change currentSpurtLength based on its type
    } else {
      this.setState({
        elapsedTime: this.state.elapsedTime + 1,
      });
    }
  }

  startTimer() {
    this.setState({
      timerIntervalId: setInterval(this.elapseTime, 100),
    }, this.props.startPom())
  }

  pauseTimer() {
    clearInterval(this.state.timerIntervalId);
    this.props.pausePom();
  }

  resumeTimer() {
    this.setState({
      timerIntervalId: setInterval(this.elapseTime, 100),
    }, this.props.resumePom())
  }

  clearTimer() {
    clearInterval(this.state.timerIntervalId);
    this.props.clearPom();
  }

  skipAhead() {
    this.setState({
      elapsedTime: this.state.currentSpurtLength
    });
  }

  componentDidMount() {
    
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
        <pre>pom's status is {this.props.pomodoro.status}</pre>
        <pre>current session is {this.props.pomodoro.currentSpurt.type}</pre>
        <pre>{JSON.stringify(this.props.pomodoro)}</pre>
        <pre>elapsed time: {this.state.elapsedTime} and remaining time: {this.state.currentSpurtLength - this.state.elapsedTime}</pre>
        {/* {/* <PieChart width={800} height={400}>
          <Pie dataKey="value" data={data02} cx={200} cy={200} outerRadius={60} fill="#8884d8" paddingAngle={5}>
          {
          	data02.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)
          }
          </Pie>
          <Pie dataKey="value" data={this.state.data} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label>
            <Cell fill={'#00C49F'}/>
            <Cell fill={'#ffffff'}/>
          </Pie>
        </PieChart> */}
        <button onClick={this.startTimer}>start timer</button> */}
        <button onClick={this.pauseTimer}>pause</button> */}
        <button onClick={this.resumeTimer}>resume</button> */}
        <button onClick={this.clearTimer}>clear</button> */}
        <button onClick={this.skipAhead}>complete spurt</button> */}
      </Paper>
    )
  }

}

const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro
})

const mapDispatchToProps = (dispatch) => {
  return {
    startPom: () => {
      dispatch(startPom())
    },
    pausePom: () => {
      dispatch(pausePom())
    },
    resumePom: () => {
      dispatch(resumePom())
    },
    clearPom: () => {
      dispatch(clearPom())
    },
    completeSpurt: () => {
      dispatch(completeSpurt())
    }
  }
}

let stylePaper = {
  background: '#EEE',
  padding: '15px',
  minHeight: '425px'
};

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroContainer);