import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, DELETE_ACTIVITY } from './types'; 
import thunk from 'redux-thunk';
import store from '../store';

export const getActivities = () => (dispatch) => {
  //axios request to db
  // dispatch({
  //   type: GET_ACTIVITIES, 
  //   payload: data
  // })
}


export const addActivity = (data) => (dispatch, getState) => {
  const {activities} = getState()
  let activityInState = checkState(data, activities)
  if (activityInState){
    console.log('already in state. update duration!')
  } else {
    console.log('not in state. update state!')
    dispatch({
      type: ADD_ACTIVITY,
      payload: data.activity
    })
  }
}

const changeCategory = (activity, oldCat, newCat) => (dispatch, getState) => {
  const {activities} = getState();
  const {[oldCat]: oldCat, [newCat]: newCat} = activities; //destructuring using variable keys
  //dispatch updated oldCat and newCat pieces of the activities obj?
  /*
  payload : {
    [oldCat]: updatedOld
    [newCat]: updatedNew
  }
  */
}

const getActivity = (app, title) => {
  for (let category in activities) {
    for (let activity of activities[category]) {
      if (activity.app === app && activity.title === title) {
        return activity;
      }
    }
  }
  return false;
}

const checkState = (data, activities) => {
  for (let category in activities) {
    for (let activity of activities[category]) {
      if (activity.title === data.activity.title && activity.app === data.activity.app) {
        return true
      }
    }
  }
  return false;
}




