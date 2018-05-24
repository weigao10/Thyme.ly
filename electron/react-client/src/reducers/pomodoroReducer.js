import { START_POM, PAUSE_POM, RESUME_POM, CLEAR_POM, COMPLETE_SPURT } from '../actions/types';
import moment from 'moment';
import Notification from 'node-mac-notifier';

const timestamp = () => {
  return moment().format('LTS');
}

//intervals for testing...should eventually hook up to user pomodoro's prefs
const WORK_LENGTH = 1000 * 60 * 25;
const LONG_BREAK_LENGTH = 1000 * 60 * 25;
const SHORT_BREAK_LENGTH = 1000 * 60 * 5;
const TOTAL_PLANNED_WORKDAY =  (WORK_LENGTH * 4 * 4)
                               + SHORT_BREAK_LENGTH * 4 * 3
                               + LONG_BREAK_LENGTH * 3;
const INTERVAL_MAP = {
  'work': WORK_LENGTH,
  'shortBreak': SHORT_BREAK_LENGTH,
  'longBreak': LONG_BREAK_LENGTH
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
  },
  elapsedTimeFromCompletedSpurts: 0, //i.e. not from current spurt, which only React knows about
  goalLength: TOTAL_PLANNED_WORKDAY
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
          length: WORK_LENGTH
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
      const lastElapsedTime = state.elapsedTimeFromCompletedSpurts;
      const lastSpurtType = state.currentSpurt.type;
      const updatedLastSpurtCount = state.completedSpurtCount[lastSpurtType] + 1;
      const { work, shortBreak, longBreak } = state.completedSpurtCount;
      
      let nextSpurtType, elapsedTime;
      if (lastSpurtType === 'work' && updatedLastSpurtCount % 4 === 0) { //expand logic to depend on user prefs
        nextSpurtType = 'longBreak';
        elapsedTime = WORK_LENGTH;
      } else if (lastSpurtType === 'work') {
        nextSpurtType = 'shortBreak';
        elapsedTime = WORK_LENGTH;
      } else {
        nextSpurtType = 'work'
        if (lastSpurtType === 'shortBreak') elapsedTime = SHORT_BREAK_LENGTH;
        else elapsedTime = LONG_BREAK_LENGTH;
      }
      let noti = new Notification('Pomodoro Alert', {body: lastSpurtType + ' over! Time for ' + nextSpurtType, soundName: 'default'});
      noti.addEventListener('click', () => noti.close());
      const updatedElapsedTime = lastElapsedTime + elapsedTime;

      return {
        ...state,
        elapsedTimeFromCompletedSpurts: updatedElapsedTime,
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