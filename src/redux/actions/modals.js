import {
  OPEN_MODAL_TASK_INIT,
  OPEN_MODAL_TASK_START,
  OPEN_MODAL_TASK_SUCCESS,
  OPEN_MODAL_TASK_FAIL,
  CLOSE_MODAL_TASK_START,
  CLOSE_MODAL_TASK_SUCCESS,
  CLOSE_MODAL_TASK_FAIL,
  CLOSE_MODAL_TASK_INIT,
} from '../types';

export const openModalTaskInit = task => {
  return { type: OPEN_MODAL_TASK_INIT, payload: task };
};

export const openModalTaskStart = () => {
  return { type: OPEN_MODAL_TASK_START };
};

export const openModalTaskSuccess = task => {
  return { type: OPEN_MODAL_TASK_SUCCESS, payload: task };
};

export const openModalTaskFail = error => {
  return { type: OPEN_MODAL_TASK_FAIL, payload: error };
};

export const closeModalTaskInit = () => {
  return { type: CLOSE_MODAL_TASK_INIT };
};

export const closeModalTaskStart = () => {
  return { type: CLOSE_MODAL_TASK_START };
};

export const closeModalTaskSuccess = () => {
  return { type: CLOSE_MODAL_TASK_SUCCESS };
};

export const closeModalTaskFail = error => {
  return { type: CLOSE_MODAL_TASK_FAIL, payload: error };
};
