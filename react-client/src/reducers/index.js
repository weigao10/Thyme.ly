import { combineReducers } from 'redux';
import activityReducer from './activityReducer.js';
import preferencesReducer from './preferencesReducer.js';
import userReducer from './userReducer.js';
import pomodoroReducer from './pomodoroReducer.js';

export default combineReducers({
  activities: activityReducer,
  preferences: preferencesReducer,
  user: userReducer,
  pomodoro: pomodoroReducer
})