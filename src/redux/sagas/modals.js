import { put, call, delay } from "redux-saga/effects";

import {
  openModalTaskInit,
  openModalTaskStart,
  openModalTaskSuccess,
  closeModalTaskInit,
  closeModalTaskStart,
  closeModalTaskSuccess,
} from '../actions';

/**
 * Open modal task window
 * @param {Object} action
 */
export function* openModalTaskSaga(action) {
  yield put(openModalTaskStart());
  const task = action.payload;
  yield put(openModalTaskSuccess(task));
}

/**
 * Close modal task window
 */
export function* closeModalTaskSaga() {
  yield put(closeModalTaskStart());
  yield put(closeModalTaskSuccess());
}