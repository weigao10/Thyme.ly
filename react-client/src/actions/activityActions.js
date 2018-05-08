import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, DELETE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
// import thunk from 'redux-thunk';

export const getActivities = () => (dispatch) => {
  
}

export const addActivity = (data) => (dispatch, getState) => {

  const {activities} = getState()
  let activityInState = checkState(data, activities)
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

const checkState = (data, activities) => {

  console.log('activities', activities)

  console.log('data', data)
  for (let category in activities) {
    for (let activity of activities[category]) {
      if (activity.title === data.activity.title && activity.app === data.activity.app) {
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





