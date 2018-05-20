import { START_POM, PAUSE_POM, RESUME_POM, CLEAR_POM, COMPLETE_SPURT } from '../actions/types';
import moment from 'moment';

const timestamp = () => {
  return moment().format('LTS');
}

//intervals for testing...should eventually hook up to user pomodoro's prefs
const TEN_SECONDS = 10 * 1000;
const FIVE_SECONDS = 5 * 1000;
const INTERVAL_MAP = {
  'work': TEN_SECONDS,
  'shortBreak': FIVE_SECONDS,
  'longBreak': TEN_SECONDS
};

const initialState = {
  pomStartTime: null, // consider actual usefulness of this
  status: 'not started',
  currentSpurt: {
    type: null,
    length: null
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
          type: 'work',
          length: TEN_SECONDS
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
        ...initialState,
        currentSpurt: {
          ...initialState.currentSpurt
        },
        completedSpurtCount: {
          ...initialState.completedSpurtCount
        }
      }
    }
    case COMPLETE_SPURT: {
      const lastSpurtType = state.currentSpurt.type;
      const updatedLastSpurtCount = state.completedSpurtCount[lastSpurtType] + 1;
      const { work, shortBreak, longBreak } = state.completedSpurtCount;
      
      let nextSpurtType;
      if (lastSpurtType === 'work' && updatedLastSpurtCount % 4 === 0) { //expand logic to depend on user prefs
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
          length: INTERVAL_MAP[nextSpurtType]
        },
        completedSpurtCount: {
          ...state.completedSpurtCount,
          [lastSpurtType]: updatedLastSpurtCount
        }
      }
    }
    default:
      return state;
  }
}

export default pomodoro;