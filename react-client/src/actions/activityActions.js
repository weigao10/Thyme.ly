import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, DELETE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
import moment from 'moment';
// import thunk from 'redux-thunk';

export const getActivities = () => (dispatch) => {
  
}

export const addActivity = (data) => (dispatch, getState) => {

  const {activities} = getState()
  let activityInState = checkState(data, activities)
  if(activityInState){
    console.log('already in state. update duration!')
    dispatch(patchActivity(activityInState, data));
  } else {
    console.log('not in state. update state!')
    // activities.nextId++
    let newData = {
      'id': activities.nextId++,
      'app': data.activity.app,
      'title': data.activity.title,
      'spurts': [{'startTime': data.activity.startTime, 'endTime': data.activity.endTime}],
      'duration': 10 //function to calc duration
    }
    dispatch({
      type: ADD_ACTIVITY,
      payload: {'activity': newData, 'nextId': activities.nextId}
    })

  }
}

const checkState = (data, activities) => {
  for (let category in activities) {
    let activity = activities[category]
    for (let i = 0; i < activity.length; i++) {
      if (activity[i].title === data.activity.title && activity[i].app === data.activity.app) {
        //return [activity[i], category, i]
        return {
          'activity': activity[i],
          'category': category,
          'index': i
        }
      }
    }
  }
  return false;
}

//patch activity
//perhaps data should include more info ??
export const patchActivity = ({activity, category, index}, data) => (dispatch, getState) => {
                              //[activity[i], category, i]
  let copySpurts = activity.spurts.slice()
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
  // console.log('category', category);
  // console.log('index', index)

  dispatch({
    type: PATCH_ACTIVITY,
    payload: {'activity': updatedActivity, 'category': category, 'index': index}
  })
}





