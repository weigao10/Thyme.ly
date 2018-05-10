import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
import moment from 'moment';

export const getActivities = () => (dispatch) => {
  
}
export const addActivity = (data) => {
  return {
    type: ADD_ACTIVITY,
    payload: data
  }
}

//patch activity
//perhaps data should include more info ??
export const patchActivity = ({ activity, category, index }, data) => {
  return {
    type: PATCH_ACTIVITY,
    payload: {activity, category, index, data}
  }
}

export const changeCategory = (id, oldCatName, newCatName) => {
  console.log('activity action firing with', id, oldCatName, newCatName)
  return {
    type: CATEGORIZE_ACTIVITY,
    payload: {
      id,
      oldCatName,
      newCatName
    }
  }
}

  // let duration = moment
  //         .duration(
  //           moment(data.activity.endTime, "MMMM Do YYYY, h:mm:ss a")
  //           .diff(moment(data.activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
  //         )
  //         .asSeconds();
  // updatedActivity.duration += duration;



