import { ADD_ACTIVITY, PATCH_ACTIVITY, CATEGORIZE_ACTIVITY, DELETE_ACTIVITY, SET_ALL_ACTIVITIES } from '../actions/types'; 
import moment from 'moment';


const initialState = {
  neutral: [],
  productive: [],
  distracting: [],
  nextId: 1
}

const activities = (state = initialState, action) => {
  console.log('action in reducer is', action)

  switch(action.type){
    case ADD_ACTIVITY:
      console.log('payload,', action.payload)
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
        [productivity]: [... state[productivity], newData],
        nextId: ++state.nextId
      }

    case DELETE_ACTIVITY:
      let newArr = state[action.payload.category].filter((el) => el.id != action.payload.id);
      return {
        ...state,
        [action.payload.category]: newArr
      };

    case PATCH_ACTIVITY:
      let {category, index, activity, data} = action.payload
      let copySpurts = (activity.spurts) || activity.spurts.slice() || ''
      let updatedActivity = Object.assign({
        spurts: copySpurts
      }, activity);
      updatedActivity.spurts.push({'startTime': data.startTime, 'endTime': data.endTime})
      updatedActivity.duration += getDuration(data.startTime, data.endTime)
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
      movingActivity.productivity = newCatName
      const updatedOldCat = state[oldCatName].filter((el) => el.id !== id);
      const updatedNewCat = [...state[newCatName] , movingActivity];
      console.log('movingactivity', movingActivity)
      return {
        ...state,
        [oldCatName]: updatedOldCat,
        [newCatName]: updatedNewCat
      };
    case SET_ALL_ACTIVITIES:
      // console.log('in set all act REDUCER', action.payload)


// [{app: "Electron", category: "neutral", duration: 6, id: 1, title: "Thyme"},
// {app: "Code", category: "neutral", duration: 14, id: 2, title: "MonitorContainer.jsx — productivity-manager"}]

      let neutral = []
      let productive = []
      let distracting = []
      action.payload.forEach((activity) => {
        // activity.productivity = activity.category
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
      // return state;
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



