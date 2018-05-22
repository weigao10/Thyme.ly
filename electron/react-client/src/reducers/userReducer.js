import { SET_USER, GET_USER } from '../actions/types';

const initialState = {
  user: '',
  token: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_TOKEN:
      // console.log('in reducer, about to set user to', action.payload)
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}

export default user;