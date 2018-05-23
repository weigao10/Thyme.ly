import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY, DELETE_ACTIVITY, SET_ALL_ACTIVITIES, AFFIRM_CATEGORIZATION } from './types'; 
import moment from 'moment';
import axios from 'axios';
import { serverURL } from '../../config.js';

export const addActivity = (data) => {
  return {
    type: ADD_ACTIVITY,
    payload: data
  }
}

export const deleteActivity = (activity, category, isTracked, user) => {
  let id = activity.id;

  const params = {
    user_name: user,
    app_name: activity.app,
    window_title: activity.title,
    prod_class: category,
    isTracked: isTracked
  }

  const request = axios.delete(serverURL + '/api/classifications', {data: params});
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

export const changeCategory = (activity, oldCatName, newCatName, isTracked, user) => {
  const params = {
    user_name: user,
    app_name: activity.app,
    window_title: activity.title,
    prod_class: newCatName,
    isTracked: isTracked
  };

  const request = newCatName === 'neutral' ? axios.delete(serverURL + '/api/classifications', {data: params}) :
  axios.post(serverURL + '/api/classifications', {params: params});
  
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

export const affirmCategorization = (activity, category, isTracked, user) => {
  const params = {
    user_name: user,
    app_name: activity.app,
    window_title: activity.title,
    prod_class: category,
    isTracked: isTracked
  };
  const request = axios.post(serverURL + '/api/classifications', {params: params});
  return {
    type: AFFIRM_CATEGORIZATION,
    payload: {
      request,
      activity,
    }
  }
}

export const setAllActivities = (data) => {
  console.log('in set all activities', data)
  return {
    type: SET_ALL_ACTIVITIES,
    payload: data
  }
}
