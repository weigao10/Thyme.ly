import { connect } from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper';
import { PieChart, Pie, Legend, Cell, Label } from 'recharts';
import moment from 'moment';

import { startPom, pausePom, resumePom, clearPom, completeSpurt } from '../actions/pomodoroActions.js';
import { startMonitor, pauseMonitor } from '../actions/monitorActions.js';

const formatMSToHMS = (ms) => {
  return moment.utc(ms).format('HH:mm:ss');
}

const formatMSToMS = (ms) => {
  return moment.utc(ms).format('mm:ss');
}

class PomodoroContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //local state, everything else is in the store
      timerIntervalId: null,
      lastCheckedTime: null, //used to compare to current time to increment elapsed time
      elapsedTime: 0,
      lastRerender: null,
    }
    this.trackTime = this.trackTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.skipAhead = this.skipAhead.bind(this); //for testing only?
  }

  trackTime() {
    if (this.state.elapsedTime >= this.props.pomodoro.currentSpurt.length ||
    (this.props.pomodoro.currentSpurt.length - this.state.elapsedTime) < 20) { //must be better way to smooth out
      this.setState({
        lastCheckedTime: Date.now(),
        elapsedTime: 0
      });
      this.props.completeSpurt();
      this.props.toggleMonitor(this.props.pomodoro.currentSpurt.type, this.props.user.user)
    } else {
      const elapsedMS = Date.now() - this.state.lastCheckedTime;
      this.setState({
        lastCheckedTime: Date.now(),
        elapsedTime: this.state.elapsedTime + elapsedMS,
      });
    }
  }

  startTimer() {
    this.setState({
      timerIntervalId: setInterval(this.trackTime, 100),
      lastCheckedTime: Date.now()
    }, this.props.startPom())
  }

  pauseTimer() {
    clearInterval(this.state.timerIntervalId);
    this.setState({running: false})
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
    this.setState({lastRerender: Date.now()})
  }

  render() {
    const { pomodoro } = this.props;
    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px'
    };

    const currentSpurtLength = pomodoro.currentSpurt.length;
    const currentSpurtData = [{name: 'elapsed time', value: this.state.elapsedTime},
                              {name: 'time remaining', value: currentSpurtLength - this.state.elapsedTime}];
    const completedSpurtLength = pomodoro.elapsedTimeFromCompletedSpurts;
    const totalGoalLength = calculateTotalGoalLength(pomodoro.prefs); 
    const totalDayData = [{name: 'total elapsed time', value: this.state.elapsedTime + completedSpurtLength},
                          {name: 'total time remaining', value: totalGoalLength - this.state.elapsedTime - completedSpurtLength}]
    // console.log('total time remaining:', totalGoalLength - this.state.elapsedTime - completedSpurtLength)
    // console.log('completed spurt length', completedSpurtLength)          
    // console.log('local state elapsed time', this.state.elapsedTime)

    return (
      <Paper style={stylePaper}>
        <div>Total time left: {formatMSToHMS(totalDayData[1].value)}</div>
        <PieChart width={800} height={400}>
          <Pie dataKey="value" data={currentSpurtData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d">
            <Label value={pomodoro.currentSpurt.type + ":  " + formatMSToMS(currentSpurtData[1].value)} position="center" /> 
            <Cell fill={'#00C49F'}/>
            <Cell fill={'#ffffff'}/>
          </Pie>
          <Pie dataKey="value" data={totalDayData} cx={200} cy={200} innerRadius={100} outerRadius={150} fill="#82ca9d">
            <Cell fill={'#0088FE'}/>
            <Cell fill={'#ffffff'}/>
          </Pie>
        </PieChart>
        {pomodoro.status === 'not started' ? <button onClick={this.startTimer}>start timer</button> : null}
        {pomodoro.status === 'running' ? <button onClick={this.pauseTimer}>pause</button> : null}
        {pomodoro.status === 'paused' ? <button onClick={this.resumeTimer}>resume</button> : null}
        {pomodoro.status === 'not started' ? null : <button onClick={this.clearTimer}>clear</button>}
        {/* last button is duplicative of the first logically, but this spaces out the buttons better */}
        <button onClick={this.skipAhead}>complete spurt</button>
      </Paper>
    )
  }
}

const calculateTotalGoalLength = ({ workLength, shortBreakLength, longBreakLength, spurtsBeforeLongBreak, pomSessionsPerDay }) => {
  return workLength * spurtsBeforeLongBreak * pomSessionsPerDay + 
         shortBreakLength * (spurtsBeforeLongBreak - 1) * pomSessionsPerDay +
         longBreakLength * (pomSessionsPerDay - 1);
}

const mapStateToProps = (state) => ({
  monitor: state.monitor,
  pomodoro: state.pomodoro,
  user: state.user
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
    },
    toggleMonitor: (currentSpurtType, user) => {
      if (currentSpurtType === 'shortBreak' || currentSpurtType === 'longBreak') {
        dispatch(pauseMonitor())
      } else if (currentSpurtType === 'work') {
        dispatch(startMonitor(user))
      }
    }
  }
}

const stylePaper = {
  background: '#EEE',
  padding: '15px',
  minHeight: '425px'
};

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroContainer);