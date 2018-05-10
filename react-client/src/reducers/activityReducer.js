//pure, centralized updates to store

import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from '../actions/types'; 

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
    {'id': 3,'app': 'Google Chrome', 'title': '', 'spurts': [{'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"}], 'duration': 45},
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
      let newData = {
        'id': state.nextId,
        'app': action.payload.app,
        'title': action.payload.title,
        'spurts': [{'startTime': action.payload.startTime, 'endTime': action.payload.endTime}],
        'duration': 10 //function to calc duration
      }
      return {
        ...state,
        neutral: [... state.neutral, newData],
        nextId: ++state.nextId
      }
    case PATCH_ACTIVITY:
      let {category, index, activity} = action.payload

      let copySpurts = activity.spurts.slice()
      let updatedActivity = Object.assign({
        spurts: copySpurts
      }, activity);
    
      updatedActivity.spurts.push({'startTime': activity.startTime, 'endTime': activity.endTime})
      updatedActivity.duration += 20
      // console.log('updated act', updatedActivity)

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
      console.log('got dispatch', action.payload)
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


export default activities;