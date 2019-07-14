import { updateObject } from 'Utils/helpers';

import {
  FETCH_TASKS_INIT,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  CREATE_TASK_INIT,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  UPDATE_TASK_INIT,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
} from '../types';

// InitState
const initialState = {
  tasks: [],
  maxPages: null,
  error: false,
  loading: false,
};

const fetchTasksInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const fetchTasksSuccess = (state, action) => {
  return updateObject(state, {
    error: false,
    loading: false,
    tasks: action.payload.tasks,
    maxPages: action.payload.maxPages,
  });
};

const fetchTasksFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

const createTaskInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const createTaskSuccess = (state, action) => {
  const task = action.payload;
  const tasks = state.tasks;
  return updateObject(state, {
    error: false,
    loading: false,
    tasks: [...tasks, task],
  });
};

const createTaskFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

const updateTaskInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const updateTaskSuccess = (state, action) => {
  const task = action.payload;
  const updatedTasks = state.tasks.map(el => {
    return el.id === task.id ? task : el;
  });
  return updateObject(state, {
    error: false,
    loading: false,
    tasks: updatedTasks,
  });
};

const updateTaskFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_INIT:
      return fetchTasksInit(state, action);
    case FETCH_TASKS_FAIL:
      return fetchTasksFail(state, action);
    case FETCH_TASKS_SUCCESS:
      return fetchTasksSuccess(state, action);
    case CREATE_TASK_INIT:
      return createTaskInit(state, action);
    case CREATE_TASK_FAIL:
      return createTaskFail(state, action);
    case CREATE_TASK_SUCCESS:
      return createTaskSuccess(state, action);
    case UPDATE_TASK_INIT:
      return updateTaskInit(state, action);
    case UPDATE_TASK_FAIL:
      return updateTaskFail(state, action);
    case UPDATE_TASK_SUCCESS:
      return updateTaskSuccess(state, action);
    default:
      return state;
  }
}
