import { combineReducers } from 'redux';
import activityReducer from './activityReducer.js';

export default combineReducers({
  activities: activityReducer
})