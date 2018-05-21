import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import combineReducers from './reducers/index';


const initialState = {};
const middleware = [thunk, ReduxPromise];
const store = createStore(combineReducers, initialState, applyMiddleware(...middleware));

export default store;