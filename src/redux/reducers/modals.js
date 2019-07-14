import { OPEN_MODAL_TASK_SUCCESS, CLOSE_MODAL_TASK_SUCCESS } from '../types';

import { updateObject } from 'Utils/helpers';

// InitState
const initialState = {
  isModalTaskOpen: false,
  task: {},
};

const openModalTaskSuccess = (state, action) => {
  return updateObject(state, {
    task: action.payload,
    isModalTaskOpen: true,
  });
};

const closeModalTaskSuccess = state => {
  return updateObject(state, {
    isModalTaskOpen: false,
    task: {},
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL_TASK_SUCCESS:
      return openModalTaskSuccess(state, action);
    case CLOSE_MODAL_TASK_SUCCESS:
      return closeModalTaskSuccess(state, action);
    default:
      return state;
  }
}
