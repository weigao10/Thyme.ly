import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY, DELETE_ACTIVITY } from '../actions/types'; 
import moment from 'moment';

const initialState = {
  trackedApps = []
}

const preferences = (state = initialState, action) => {

  switch(action.type){
    case TRACK_APP_TITLE:
      return {
        ...state,
        trackedApps: [... state[newData.productivity], newData]
      }

    case DELETE_ACTIVITY:
      console.log('inside DELETE ACTIVITY REDUCER');
      let newArr = state[action.payload.category].filter((el) => el.id != action.payload.id);
      return {
        ...state,
        [action.payload.category]: newArr
      };
    
    default: 
      return state;
  }
}



export default preferences;
