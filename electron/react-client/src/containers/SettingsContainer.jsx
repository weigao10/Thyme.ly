import { connect } from 'react-redux';
import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

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
    alert('Your pomodoro timer preferences have been updated.')
  }

  handleChange(e, value) {
    this.setState({
      [e.target.name]: value
    });
  }

  render() {
    return (
      <div style={{width: '100%'}}>
      <form style={{display: 'inline-block', width: '200px'}} onSubmit={this.handleSubmit}>
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

      <Paper style={{width: '350px', maxHeight: '475px', overflowY: 'scroll', paddingRight: '30px', fontWeight: 'bold', float: 'right', display: 'inline-block'}}>
        Work Spurt Length: &nbsp;{this.state.workLength}
        <Slider name="workLength" defaultValue={this.state.workLength} value={this.state.workLength} onChange={this.handleChange} min={0} max={100}/><br/>
        Short Break Length: &nbsp;{this.state.shortBreakLength}
        <Slider name="shortBreakLength" defaultValue={this.state.shortBreakLength} value={this.state.shortBreakLength} onChange={this.handleChange} min={0} max={100}/><br/>
        Spurts Before Long Break: &nbsp;{this.state.spurtsBeforeLongBreak}
        <Slider name="spurtsBeforeLongBreak" defaultValue={this.state.spurtsBeforeLongBreak} value={this.state.spurtsBeforeLongBreak} onChange={this.handleChange} min={0} max={100}/><br/>
        Long Break Length: &nbsp;{this.state.longBreakLength}
        <Slider name="longBreakLength" defaultValue={this.state.longBreakLength} value={this.state.longBreakLength} onChange={this.handleChange} min={0} max={100}/><br/>
        Pomodoro Sessions: &nbsp;{this.state.pomSessionsPerDay}
        <Slider name="pomSessionsPerDay" defaultValue={this.state.pomSessionsPerDay} value={this.state.pomSessionsPerDay} onChange={this.handleChange} min={0} max={100}/><br />
      
      </Paper>
      </div>
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