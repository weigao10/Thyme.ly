import { TOGGLE_MONITOR, START_MONITOR, PAUSE_MONITOR } from '../actions/types';

const initialState = {
  running: false
};

const monitor = (state = initialState, action) => {
  switch (action.type) {
    case START_MONITOR:
      return {running: true}
    case PAUSE_MONITOR:
      return {running: false}
    case TOGGLE_MONITOR:
      return {running: !state.running}
    default:
      return state;
  }
}

export default monitor;