import { ipcRenderer } from 'electron';
import { SET_USER, GET_USER, LOG_OUT } from './types'; 

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const logout = () => {

}

export const getUser = () => {
  return {
    type: GET_USER
  }
}

