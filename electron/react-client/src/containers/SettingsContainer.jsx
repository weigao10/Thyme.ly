import { connect } from 'react-redux';
import React from 'react';

import { setPomPrefs } from '../actions/pomodoroActions.js';

const msToMinutes = (ms) => {
  return parseInt((ms / 1000 / 60), 10);
};

const minutesToMs = (minutes) => minutes * 60 * 1000;

//should not be able to update if pom is still running!

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const { prefs } = props.pomodoro;
    this.state = {
      workLength: msToMinutes(prefs.workLength),
      shortBreakLength: msToMinutes(prefs.shortBreakLength),
      longBreakLength: msToMinutes(prefs.longBreakLength),
      spurtsBeforeLongBreak: prefs.spurtsBeforeLongBreak,
      pomSessionsPerDay: prefs.pomSessionsPerDay
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.pomodoro.status !== 'not started') {
      alert('Please clear pomodoro timer before changing pomodoro sessions!');
      return;
    }
    this.props.setPomPrefs({
      workLength: minutesToMs(this.state.workLength),
      shortBreakLength: minutesToMs(this.state.shortBreakLength),
      longBreakLength: minutesToMs(this.state.longBreakLength),
      spurtsBeforeLongBreak: this.state.spurtsBeforeLongBreak,
      pomSessionsPerDay: this.state.pomSessionsPerDay
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Work Spurt Length (Minutes): <textarea name="workLength" value={this.state.workLength} onChange={this.handleChange}/>
        </label><br/>
        <label>
          Short Break Length (Minutes): <textarea name="shortBreakLength" value={this.state.shortBreakLength} onChange={this.handleChange} />
        </label><br/>
        <label>
          Spurts Before Long Break: <textarea name="spurtsBeforeLongBreak" value={this.state.spurtsBeforeLongBreak} onChange={this.handleChange} />
        </label><br/>
        <label>
          Long Break Length (Minutes): <textarea name="longBreakLength" value={this.state.longBreakLength} onChange={this.handleChange} />
        </label><br/>
        <label>
          Pomodoro Sessions: <textarea name="pomSessionsPerDay" value={this.state.pomSessionsPerDay} onChange={this.handleChange} />
        </label><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPomPrefs: (prefs) => {dispatch(setPomPrefs(prefs))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);