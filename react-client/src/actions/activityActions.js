import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from './types'; 
import { createStore } from 'redux';
import moment from 'moment';
import axios from 'axios';
const url = 'http://127.0.0.1:3000'

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

export const changeCategory = (activity, oldCatName, newCatName) => {
  console.log('change cat action firing with', activity, oldCatName, newCatName)
  //send off the username, apptitle, windowtitle to server
  //return dat payload
  const params = {
    user_name: 'brian',
    app_name: activity.app,
    window_title: activity.title,
    prod_class: newCatName
  };
  console.log('params are', params)
  const request = axios.post(url + '/api/classifications', {params: params})
  return {
    type: CATEGORIZE_ACTIVITY,
    payload: {
      request,
      id: activity.id,
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



