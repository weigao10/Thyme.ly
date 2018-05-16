import { SET_USER, GET_USER } from '../actions/types';

const initialState = {
  user: ''
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      console.log('in reducer, about to set user to', action.payload)
      return {
        user: action.payload
      }
    default:
      return state;
  }
}

export default user;