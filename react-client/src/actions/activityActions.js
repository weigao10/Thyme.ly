import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY, DELETE_ACTIVITY, SET_ALL_ACTIVITIES } from './types'; 
// import { createStore } from 'redux';
import moment from 'moment';
import axios from 'axios';
const url = 'http://127.0.0.1:3000'

export const addActivity = (data) => {
  return {
    type: ADD_ACTIVITY,
    payload: data
  }
}

export const deleteActivity = (id, category) => {
  return {
    type: DELETE_ACTIVITY,
    payload: {id, category}
  }
}

export const patchActivity = ({ activity, category, index }, data) => {
  return {
    type: PATCH_ACTIVITY,
    payload: {activity, category, index, data}
  }
}

export const changeCategory = (activity, oldCatName, newCatName) => {
  //send off the username, apptitle, windowtitle to server
  //return dat payload
  const params = {
    user_name: 'brian',
    app_name: activity.app,
    window_title: activity.title,
    prod_class: newCatName
  };

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

export const setAllActivities = (data) => {
  return {
    type: SET_ALL_ACTIVITIES,
    payload: data
  }
}

