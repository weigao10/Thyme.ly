import { GET_ACTIVITIES, ADD_ACTIVITY, PATCH_ACTIVITY } from '../actions/types'; 

const initialState = {
  activities: [
    {'app': 'Chrome', 'title': 'Youtube', 'duration': '1'},
    {'app': 'Chrome', 'title': 'Netflix', 'duration': '2'},
    {'app': 'Chrome', 'title': 'Facebook', 'duration': '3'},
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
        activities: [... state.activities, action.payload]
      }
    default: 
      return state;
  }
}
