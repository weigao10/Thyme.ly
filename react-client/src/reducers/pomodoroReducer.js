import { START_POM, PAUSE_POM, CLEAR_POM } from '../actions/types';
import moment from 'moment';

const timestamp = () => {
  return moment().format('LTS');
}

const initialState = {
  pomStartTime: null, // consider actual usefulness of this
  status: 'not started',
  currentSpurt: {
    type: null,
    startTime: null // or just calculate elapsed time in the component itself
  },
  completedSpurtCount: {
    work: 0,
    shortBreak: 0,
    longBreak: 0
  }
};

const pomodoro = (state = initialState, action) => {
  switch (action.type) {
    case START_POM: {
      return {
        ...state,
        status: 'running',
        pomStartTime: timestamp(),
        currentSpurt: {
          type: state.nextSpurtType,
          startTime: timestamp()
        }
      }
    }
    case PAUSE_POM: {
      return {
        ...state,
        status: 'paused',
      }
    }
    case RESUME_POM: {
      return {
        ...state,
        status: 'running'
      }
    }
    case CLEAR_POM: {
      return {
        initialState
      }
    }
    case COMPLETE_SPURT: {
      const lastSpurtType = state.currentSpurt.type;
      const lastSpurtCount = state.completedSpurtsCount[lastSpurtType];
      const { work, shortBreak, longBreak } = state.completedSpurtCount;
      //expand logic to depend on user prefs
      let nextSpurtType;
      if (lastSpurtType === 'work' && work % 4 === 0) {
        nextSpurtType = 'longBreak';
      } else if (lastSpurtType === 'work') {
        nextSpurtType = 'shortBreak';
      } else {
        nextSpurtType = 'work'
      }

      return {
        ...state,
        currentSpurt: {
          type: nextSpurtType,
          startTime: timestamp()
        },
        completedSpurtCount: {
          [lastSpurtType]: lastSpurtCount + 1
        }
      }
    }
    default:
      return state;
  }
}

export default user;