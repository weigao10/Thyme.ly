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
      lastCheckedTime: null, //used to compare to current time to increment elapsed time
      elapsedTime: 0
    }
    this.trackTime = this.trackTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.skipAhead = this.skipAhead.bind(this); //for testing only?
  }

  trackTime() {
    //FIND A WAY TO SMOOTH THIS TIMER OUT BETTER
    if (this.state.elapsedTime >= this.props.pomodoro.currentSpurt.length ||
    (this.props.pomodoro.currentSpurt.length - this.state.elapsedTime) < 20) { //must be better way to smooth out
      this.props.completeSpurt();
      this.setState({
        lastCheckedTime: Date.now(),
        elapsedTime: 0
      })
    } else {
      const elapsedMS = Date.now() - this.state.lastCheckedTime;
      this.setState({
        lastCheckedTime: Date.now(),
        elapsedTime: this.state.elapsedTime + elapsedMS,
      });
    }
  }

  //add error checking to buttons so that nothing happens if you press start if the timer is already started, etc.

  startTimer() {
    this.setState({
      timerIntervalId: setInterval(this.trackTime, 100),
      lastCheckedTime: Date.now()
    }, this.props.startPom())
  }

  pauseTimer() {
    clearInterval(this.state.timerIntervalId);
    this.props.pausePom();
  }

  resumeTimer() {
    const resumedTime = Date.now();
    this.setState({
      timerIntervalId: setInterval(this.trackTime, 100),
      lastCheckedTime: resumedTime
    }, this.props.resumePom())
  }

  clearTimer() {
    clearInterval(this.state.timerIntervalId);
    this.setState({
      lastCheckedTime: null,
      elapsedTime: 0
    }, this.props.clearPom());
  }

  skipAhead() {
    this.setState({
      elapsedTime: this.props.pomodoro.currentSpurt.length,
      lastCheckedTime: Date.now()
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

    const currentSpurtLength = this.props.pomodoro.currentSpurt.length;
    const currentSpurtData = [{name: 'elapsed time', value: this.state.elapsedTime},
                              {name: 'time remaining', value: currentSpurtLength - this.state.elapsedTime}];
    const completedSpurtLength = this.props.pomodoro.elapsedTimeFromCompletedSpurts;
    const totalGoalLength = this.props.pomodoro.goalLength;
    const totalDayData = [{name: 'total elapsed time', value: this.state.elapsedTime + completedSpurtLength},
                          {name: 'total time remaining', value: totalGoalLength - this.state.elapsedTime - completedSpurtLength}]


    return (
      <Paper style={stylePaper}>
        <pre>pom's status is {this.props.pomodoro.status}</pre>
        <pre>current session is {this.props.pomodoro.currentSpurt.type}</pre>
        <pre>{JSON.stringify(this.props.pomodoro)}</pre>
        <pre>elapsed time: {this.state.elapsedTime} and remaining time: {this.props.pomodoro.currentSpurt.length - this.state.elapsedTime}</pre>
        <PieChart width={800} height={400}>
          <Pie dataKey="value" data={currentSpurtData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label>
            <Cell fill={'#00C49F'}/>
            <Cell fill={'#ffffff'}/>
          </Pie>
          <Pie dataKey="value" data={totalDayData} cx={200} cy={200} innerRadius={100} outerRadius={150} fill="#82ca9d" label>
            <Cell fill={'#0088FE'}/>
            <Cell fill={'#ffffff'}/>
          </Pie>
        </PieChart>
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