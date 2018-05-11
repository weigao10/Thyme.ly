//pure, centralized updates to store

import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from '../actions/types'; 
import moment from 'moment';

const initialState = {
  neutral: [
      {'id': 0,
      'app': 'System Preferences',
      'title': 'Control Panel',
      'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}],
      'duration': 15},
  ],
  productive: [
    {'id': 1, 'app': 'Google Chrome', 'title': 'Productivity Manager', 'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}], 'duration': 20},
    {'id': 2,'app': 'Chrome', 'title': 'Youtube - WTF IS REDUX', 'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}], 'duration': 76},
  ],
  distracting: [
    {'id': 3,'app': 'Google Chrome', 'title': 'Reddit', 'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}], 'duration': 45},
    {'id': 4,'app': 'Google Chrome', 'title': 'Store - Redux', 'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}], 'duration': 108},
  ],
  nextId: 5
}

const activities = (state = initialState, action) => {
  // console.log('reached reducer');
  switch(action.type){
    case GET_ACTIVITIES: 
      return {
        ...state, 
        // activities: [... state.activities, action.payload]
      }
    case ADD_ACTIVITY:
      // console.log('reducer add act', action.payload)
      // console.log(state)
      let newData = {
        'id': state.nextId,
        'app': action.payload.app,
        'title': action.payload.title,
        'spurts': [{'startTime': action.payload.startTime, 'endTime': action.payload.endTime}],
        'duration': 10, //function to calc duration
        'productivity': action.payload.productivity || 'neutral' //if null, make neutral for now
      }
      console.log('productivity cat inside reducer is', newData.productivity);
      return {
        ...state,
        [newData.productivity]: [... state[newData.productivity], newData],
        nextId: ++state.nextId
      }
    case PATCH_ACTIVITY:
      let {category, index, activity, data} = action.payload
      let copySpurts = activity.spurts.slice()
      let updatedActivity = Object.assign({
        spurts: copySpurts
      }, activity);
    
      updatedActivity.spurts.push({'startTime': data.startTime, 'endTime': data.endTime})
      updatedActivity.duration += getDuration(data.startTime, data.endTime);

      return {
        ...state,
        [category]: [
                    ...state[category].slice(0,index),
                    updatedActivity,
                    ...state[category].slice(index + 1)
                    ]
      }
      // return state
    case CATEGORIZE_ACTIVITY:
      // console.log('got dispatch', action.payload)
      let {id, oldCatName, newCatName} = action.payload;
      const movingActivity = state[oldCatName].filter((el) => el.id === id)[0];
      const updatedOldCat = state[oldCatName].filter((el) => el.id !== id);
      const updatedNewCat = [...state[newCatName] , movingActivity];
      // console.log('here is your new stuff in the reducer', movingActivity, updatedOldCat, updatedNewCat)
      return {
        ...state,
        [oldCatName]: updatedOldCat,
        [newCatName]: updatedNewCat
      };
    default: 
      // console.log('default', state)
      return state;
  }
}

const getDuration = (start, end) => {
  return moment
          .duration(
            moment(end, "MMMM Do YYYY, h:mm:ss a")
            .diff(moment(start, "MMMM Do YYYY, h:mm:ss a"))
          )
          .asSeconds();
}


export default activities;
