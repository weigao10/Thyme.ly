import { ipcRenderer } from 'electron';
import { SET_USER, GET_USER, LOG_OUT, SET_TOKEN, GET_TOKEN } from './types'; 

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const getUser = () => {
  return {
    type: GET_USER
  }
}

export const getToken = () => {
  return {
    type: GET_TOKEN
  }
}
