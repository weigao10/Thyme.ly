import { TRACK_APP_TITLE, UNTRACK_APP_TITLE } from '../actions/types'; 

const initialState = {
  trackedApps: ['Google Chrome', 'Firefox', 'Safari']
}

const preferences = (state = initialState, action) => {

  switch(action.type){
    case TRACK_APP_TITLE:
      return {
        ...state,
        trackedApps: [... state.trackedApps, action.payload.data]
      }

    case UNTRACK_APP_TITLE:
      let newArr = state.trackedApps.filter((el) => el !== action.payload.data);
      return {
        ...state,
        trackedApps: newArr
      };
    
    default: 
      return state;
  }
}



export default preferences;
