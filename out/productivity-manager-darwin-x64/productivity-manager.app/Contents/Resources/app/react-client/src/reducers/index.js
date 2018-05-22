import { combineReducers } from 'redux';
import activityReducer from './activityReducer.js';
import preferencesReducer from './preferencesReducer.js'

export default combineReducers({
  activities: activityReducer,
  preferences: preferencesReducer
})