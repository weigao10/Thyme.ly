import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY, DELETE_ACTIVITY, SET_ALL_ACTIVITIES } from '../actions/types'; 
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
      // console.log('action payload', action.payload)
      let {app, title, startTime, endTime, productivity} = action.payload
      let duration = getDuration(startTime, endTime)
      const convertedProd = { //expand because app should know whether it was from ML or not
        ...productivity,
        class: productivity.class || 'neutral'
      };
      // console.log('converted productivity inside add activity reducer', convertedProd)
      let newData = {
        'id': state.nextId,
        'app': app,
        'title': title,
        'spurts': [{'startTime': startTime, 'endTime': endTime}],
        'duration': duration,
        'productivity': convertedProd
      }
      return {
        ...state,
        [newData.productivity.class]: [... state[newData.productivity.class], newData],
        nextId: ++state.nextId
      }

    case DELETE_ACTIVITY:
      let { category } = action.payload
      let newArr = state[category].filter((el) => el.id !== action.payload.id); //don't deconstruct id
      return {
        ...state,
        [category]: newArr
      };

    case PATCH_ACTIVITY:
      let { index, activity, data } = action.payload
      let copySpurts = (activity.spurts) ? activity.spurts.slice() : []
      let updatedActivity = Object.assign({
        spurts: copySpurts
      }, activity);
      // console.log('activity.productivity is', activity.productivity)
      // console.log('activity.productivity.class is', activity.productivity.class)
      updatedActivity.spurts.push({'startTime': data.startTime, 'endTime': data.endTime})
      updatedActivity.duration += getDuration(data.startTime, data.endTime)
      return {
        ...state,
        [activity.productivity.class]: [
                    ...state[activity.productivity.class].slice(0,index),
                    updatedActivity,
                    ...state[activity.productivity.class].slice(index + 1)
                    ]
      }

    case CATEGORIZE_ACTIVITY:
      let { id, oldCatName, newCatName } = action.payload;
      const movingActivity = state[oldCatName].filter((el) => el.id === id)[0];
      movingActivity.productivity = newCatName;
      const updatedOldCat = state[oldCatName].filter((el) => el.id !== id);
      const updatedNewCat = [...state[newCatName] , movingActivity];
      return {
        ...state,
        [oldCatName]: updatedOldCat,
        [newCatName]: updatedNewCat
      };

    case SET_ALL_ACTIVITIES:
      let neutral = []
      let productive = []
      let distracting = []
      action.payload.forEach((activity) => {
        if(activity.productivity === 'neutral') neutral.push(activity);
        if(activity.productivity === 'productive') productive.push(activity);
        if(activity.productivity === 'distracting') distracting.push(activity);
      })

    return {
      ...state,
      neutral: neutral,
      productive: productive,
      distracting: distracting,
      nextId: action.payload.length
    }
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
