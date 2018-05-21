import { TRACK_APP_TITLE, UNTRACK_APP_TITLE } from './types'; 

export const trackAppTitle = (data) => {
  return {
    type: TRACK_APP_TITLE,
    payload: data
  }
}

export const untrackAppTitle = (data) => {
  return {
    type: UNTRACK_APP_TITLE,
    payload: data
  }
}

