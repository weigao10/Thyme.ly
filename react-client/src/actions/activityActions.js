import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, DELETE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import activities from '../reducers/activityReducer.js'
import store from '../store.js'


export const getActivities = () => (dispatch) => {
  
}

export const addActivity = (data) => (dispatch) => {

  let activityInState = checkState(data.activity)
  if(activityInState){
    console.log('already in state. update duration!')
  } else {
    console.log('not in state. update state!')
    dispatch({
      type: ADD_ACTIVITY,
      payload: data.activity
    })
  }
}
// const store = createStore(activities);
const checkState = (activity) => {

  let state = store.getState().activities
  let title = activity.title;
  let app = activity.app;
console.log('state', state)
  for (let category in state) {
    for (let activity of state[category]) {
      if (activity.title === title && activity.app === app) {
        return true
      }
    }
  }
  return false;
}

//patch activity 
//perhaps data should include more info ??
export const patchActivity = (data) => (dispatch) => {
  dispatch({
    type: PATCH_ACTIVITY,
    payload: data.activity
  })
}





