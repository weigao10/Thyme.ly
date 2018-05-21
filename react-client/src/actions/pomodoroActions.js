import { START_POM, PAUSE_POM, RESUME_POM, CLEAR_POM, COMPLETE_SPURT } from './types'; 

export const startPom = () => {
  return {
    type: START_POM
  }
};

export const pausePom = () => {
  return {
    type: PAUSE_POM
  }
};

export const resumePom = () => {
  return {
    type: RESUME_POM
  }
};

export const clearPom = () => {
  return {
    type: CLEAR_POM
  }
};

export const completeSpurt = () => {
  return {
    type: COMPLETE_SPURT
  }
}
