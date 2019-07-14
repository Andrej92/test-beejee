import fetch from 'isomorphic-fetch';
import { put, call } from 'redux-saga/effects';
import promise from 'es6-promise';
import config from 'Config';

import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFail,
  createTaskStart,
  createTaskSuccess,
  createTaskFail,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFail,
  closeModalTaskInit,
} from '../actions';

promise.polyfill();

/**
 * Fetch Tasks from current pagination page
 * @param {Object} action
 */
export function* fetchTasksSaga(action) {
  yield put(fetchTasksStart());

  try {
    const { pageNum, sortedBy } = action.payload;
    const { apiUrl, developer, headers } = config;

    const response = yield fetch(
      `${apiUrl}?page=${pageNum}&developer=${developer}&sort_field=${sortedBy}`,
      {
        method: 'GET',
        headers,
      },
    );

    const data = yield call([response, response.json]);

    if (data.status !== 'ok') {
      yield put(fetchTasksFail(data.message));
    } else {
      yield put(
        fetchTasksSuccess({
          tasks: data.message.tasks,
          maxPages: parseInt(data.message.total_task_count), // WTF string ?
        }),
      );
    }
  } catch (error) {
    yield put(fetchTasksFail(error.message));
  }
}

/**
 * Create Task
 * @param {Object} action
 */
export function* createTaskSaga(action) {
  yield put(createTaskStart());

  try {
    const { email, text, username } = action.payload.taskData;
    const history = action.payload.history;
    const { apiUrl, developer } = config;
    const task = new FormData();
    task.append('username', username);
    task.append('email', email);
    task.append('text', text);
    const response = yield fetch(`${apiUrl}create?developer=${developer}`, {
      method: 'POST',
      body: task,
    });

    const data = yield call([response, response.json]);

    if (data.status !== 'ok') {
      yield put(createTaskFail(data.message));
    } else {
      yield put(
        createTaskSuccess({
          tasks: data.message,
        }),
      );
      yield history.push('/');
    }
  } catch (error) {
    yield put(createTaskFail(error.message));
  }
}

/**
 * Update Task
 * @param {Object} action
 */
export function* updateTaskSaga(action) {
  yield put(updateTaskStart());

  try {
    const { email, text, username, id, status } = action.payload;
    const token = yield localStorage.getItem('token');
    const { apiUrl, developer } = config;
    const task = new FormData();
    task.append('status', status);
    task.append('text', text);
    task.append('token', token);

    const response = yield fetch(`${apiUrl}edit/${id}?developer=${developer}`, {
      method: 'POST',
      body: task,
    });

    const data = yield call([response, response.json]);

    if (data.status !== 'ok') {
      yield put(updateTaskFail(data.message));
    } else {
      yield put(updateTaskSuccess({ id, email, text, username, status }));
      yield put(closeModalTaskInit());
    }
  } catch (error) {
    yield put(updateTaskFail(error.message));
  }
}
