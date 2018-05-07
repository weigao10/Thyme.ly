import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from '../actions/types'; 

const initialState = {
  neutral: [
      {'app': 'System Preferences', 'title': 'Control Panel', 'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"},
  ],
  productive: [
    {'app': 'Atom', 'title': 'productive.js', 'startTime': "May 7th 2018, 6:51:26 pm", 'endTime': "May 7th 2018, 7:51:46 pm"},
    {'app': 'Chrome', 'title': 'Youtube - WTF IS REDUX', 'startTime': "May 7th 2018, 5:55:26 pm", 'endTime': "May 7th 2018, 5:59:46 pm"},
  ],
  distracting: [
    {'app': 'Chrome', 'title': 'Facebook', 'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:46 pm"},
    {'app': 'Chrome', 'title': 'gchat', 'startTime': "May 7th 2018, 5:51:26 pm", 'endTime': "May 7th 2018, 5:51:47 pm"},
  ]
}

export default function (state = initialState, action) {
  switch(action.type){
    case GET_ACTIVITIES: 
      return {
        ...state, 
        activities: [... state.activities, action.payload]
      }
    case ADD_ACTIVITY:
      return {
        ...state,
        neutral: [... state.neutral, action.payload]
      }
    // case CATEGORIZE_ACTIVITY:
    //   return {
    //     ...state,
    //     activities: [... state.activities, action.payload]
    //   }
    default: 
      return state;
  }
}
