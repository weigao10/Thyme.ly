import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
import moment from 'moment';

export const getActivities = () => (dispatch) => {
  
}

//look into react-redux to avoid using dispatch -- ?
export const addActivity = (data) => {
  // console.log('data in add activity', data)
  return {
    type: ADD_ACTIVITY,
    payload: data
  }
}

//patch activity
//perhaps data should include more info ??
export const patchActivity = ({activity, category, index}, data) => (dispatch, getState) => {
  let copySpurts = activity.spurts.slice()
  //consider using object spread operator?
  let updatedActivity = Object.assign({
    spurts: copySpurts
  }, activity);

  updatedActivity.spurts.push({'startTime': data.activity.startTime, 'endTime': data.activity.endTime})
  updatedActivity.duration += 20

  // let duration = moment
  //         .duration(
  //           moment(data.activity.endTime, "MMMM Do YYYY, h:mm:ss a")
  //           .diff(moment(data.activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
  //         )
  //         .asSeconds();
  // updatedActivity.duration += duration;
  console.log('updatedActivity', updatedActivity);

  dispatch({
    type: PATCH_ACTIVITY,
    payload: {'activity': updatedActivity, 'category': category, 'index': index}
  })
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





