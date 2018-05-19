import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY,
        DELETE_ACTIVITY, SET_ALL_ACTIVITIES, AFFIRM_CATEGORIZATION } from '../actions/types'; 
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
      console.log('old activity.productivity inside PATCH is', activity.productivity)
      console.log('new activity.productivity inside PATCH is', updatedActivity.productivity)
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
      let movingActivity = state[oldCatName].filter((el) => el.id === id)[0];
      movingActivity.productivity = {
        source: 'user',
        class: newCatName
      };
      console.log('moving activity is', movingActivity)
      const updatedOldCat = state[oldCatName].filter((el) => el.id !== id);
      const updatedNewCat = [...state[newCatName] , movingActivity];
      return {
        ...state,
        [oldCatName]: updatedOldCat,
        [newCatName]: updatedNewCat
      };

    case AFFIRM_CATEGORIZATION: {
      const { activity } = action.payload;
      const prodClass = activity.productivity.class;
      const activityIdx = state[prodClass].indexOf(activity);
      console.log('idx of activity is', activityIdx);
      const affirmedActivity = {
        ...activity,
        productivity: {
          source: 'user',
          class: prodClass
        }
      }
      console.log('affirmed activity is', affirmedActivity);
      return {
        ...state,
        [prodClass]: [
          ...state[prodClass].slice(0, activityIdx),
          affirmedActivity,
          ...state[prodClass].slice(activityIdx + 1)
        ]
      }
    }
    case SET_ALL_ACTIVITIES: //REVISE BASED ON ACTIVITY OBJ CHANGE
      let neutral = []
      let productive = []
      let distracting = []
      action.payload.forEach((activity) => {
        console.log('activity inside set all activities is', activity)
        if (activity.productivity.class === 'neutral') neutral.push(activity);
        if (activity.productivity.class === 'productive') productive.push(activity);
        if (activity.productivity.class === 'distracting') distracting.push(activity);
        // if (activity.productivity === null) neutral.push(activity); //JUST IN CASE
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
