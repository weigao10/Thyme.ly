import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, DELETE_ACTIVITY } from './types'; 
import thunk from 'redux-thunk';

export const getActivities = () => (dispatch) => {
  //axios request to db
  // dispatch({
  //   type: GET_ACTIVITIES, 
  //   payload: data
  // })
}

export const addActivity = (data) => (dispatch) => {
  // console.log('data in post', data.activity);
  dispatch({
    type: ADD_ACTIVITY,
    payload: data.activity
  })
}




