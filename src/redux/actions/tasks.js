import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action';

import {
  FETCH_TASKS_INIT,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_START,
  FETCH_TASKS_FAIL,
  CREATE_TASK_INIT,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_START,
  CREATE_TASK_FAIL,
  UPDATE_TASK_INIT,
  UPDATE_TASK_START,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
} from '../types';

export const fetchTasksInit = (pageNum = 1, sortedBy = 'id') => {
  return {
    type: FETCH_TASKS_INIT,
    payload: {
      pageNum,
      sortedBy,
    },
    [WAIT_FOR_ACTION]: FETCH_TASKS_SUCCESS,
    [ERROR_ACTION]: FETCH_TASKS_FAIL,
  };
};

export const fetchTasksStart = () => {
  return { type: FETCH_TASKS_START };
};

export const fetchTasksSuccess = data => {
  return { type: FETCH_TASKS_SUCCESS, payload: data };
};

export const fetchTasksFail = data => {
  return { type: FETCH_TASKS_FAIL, payload: data };
};

export const createTaskInit = (taskData, history) => {
  return { type: CREATE_TASK_INIT, payload: { taskData, history } };
};

export const createTaskSuccess = data => {
  return { type: CREATE_TASK_SUCCESS, payload: data };
};

export const createTaskFail = data => {
  return { type: CREATE_TASK_FAIL, payload: data };
};

export const createTaskStart = () => {
  return { type: CREATE_TASK_START };
};

export const updateTaskInit = data => {
  return { type: UPDATE_TASK_INIT, payload: data };
};

export const updateTaskSuccess = data => {
  return { type: UPDATE_TASK_SUCCESS, payload: data };
};

export const updateTaskFail = data => {
  return { type: UPDATE_TASK_FAIL, payload: data };
};

export const updateTaskStart = () => {
  return { type: UPDATE_TASK_START };
};
