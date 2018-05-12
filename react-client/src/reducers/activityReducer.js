import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY } from '../actions/types'; 
import moment from 'moment';

const initialState = {
  neutral: [],
  productive: [],
  distracting: [],
  nextId: 1
}

const activities = (state = initialState, action) => {

  switch(action.type){
    case ADD_ACTIVITY:
      let {app, title, startTime, endTime, productivity} = action.payload
      let duration = getDuration(startTime, endTime)
      let newData = {
        'id': state.nextId,
        'app': app,
        'title': title,
        'spurts': [{'startTime': startTime, 'endTime': endTime}],
        'duration': duration,
        'productivity': productivity || 'neutral' //if null, make neutral for now
      }
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

      return {
        ...state,
        [category]: [
                    ...state[category].slice(0,index),
                    updatedActivity,
                    ...state[category].slice(index + 1)
                    ]
      }
    case CATEGORIZE_ACTIVITY:
      let {id, oldCatName, newCatName} = action.payload;
      const movingActivity = state[oldCatName].filter((el) => el.id === id)[0];
      const updatedOldCat = state[oldCatName].filter((el) => el.id !== id);
      const updatedNewCat = [...state[newCatName] , movingActivity];
      return {
        ...state,
        [oldCatName]: updatedOldCat,
        [newCatName]: updatedNewCat
      };
    default: 
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
