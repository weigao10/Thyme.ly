import { combineReducers } from 'redux';

import monitorReducer from './monitorReducer.js'
import activityReducer from './activityReducer.js';
import preferencesReducer from './preferencesReducer.js';
import userReducer from './userReducer.js';
import pomodoroReducer from './pomodoroReducer.js';

export default combineReducers({
  monitor: monitorReducer,
  activities: activityReducer,
  preferences: preferencesReducer,
  user: userReducer,
  pomodoro: pomodoroReducer
})