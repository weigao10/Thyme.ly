import { GET_ACTIVITIES, POST_ACTIVITIES, PATCH_ACTIVITY } from '../actions/types'; 

const initialState = {
  activities: {},
  activity: []
}

export default function (state = initialState, action) {
  switch(action.type){
    case GET_ACTIVITIES: 
      return {
        ...state, 
        activities: action.payload
      }
    default: 
      return state;
  }
}