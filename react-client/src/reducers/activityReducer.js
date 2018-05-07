import { GET_ACTIVITIES, POST_ACTIVITIES, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from '../actions/types'; 

const initialState = {
  neutral: [
      {'app': 'System Preferences', 'title': 'Control Panel', 'duration': '2'},
  ],
  productive: [
    {'app': 'Atom', 'title': 'productive.js', 'duration': '3'},
    {'app': 'Chrome', 'title': 'Youtube - WTF IS REDUX', 'duration': '3'},
  ],
  distracting: [
    {'app': 'Chrome', 'title': 'Facebook', 'duration': '3'},
    {'app': 'Chrome', 'title': 'gchat', 'duration': '3'},
  ]
}

export default function (state = initialState, action) {
  switch(action.type){
    // case GET_ACTIVITIES: 
    //   return {
    //     ...state, 
    //     activities: [... state.activities, action.payload]
    //   }
    case POST_ACTIVITIES:
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
