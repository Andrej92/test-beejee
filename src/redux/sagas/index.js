import { all, takeEvery } from 'redux-saga/effects';

import {
  AUTH_INIT,
  AUTH_LOGOUT_INIT,
  AUTH_LOGIN_INIT,
  AUTH_CHECK_TIMEOUT_INIT,
  FETCH_TASKS_INIT,
  CREATE_TASK_INIT,
  UPDATE_TASK_INIT,
  CLOSE_MODAL_TASK_INIT,
  OPEN_MODAL_TASK_INIT,
} from '../types';

// Auth Saga functions
import { authLogoutSaga, authLoginSaga, authCheckTimeoutSaga, authCheckStateSaga } from './auth';

// Tasks Saga functions
import { fetchTasksSaga, createTaskSaga, updateTaskSaga } from './tasks';

// Modals Saga functions
import { openModalTaskSaga, closeModalTaskSaga, } from './modals';

function* rootSagas() {
  yield all([
    takeEvery(AUTH_INIT, authCheckStateSaga),
    takeEvery(AUTH_LOGOUT_INIT, authLogoutSaga),
    takeEvery(AUTH_LOGIN_INIT, authLoginSaga),
    takeEvery(AUTH_CHECK_TIMEOUT_INIT, authCheckTimeoutSaga),
    takeEvery(FETCH_TASKS_INIT, fetchTasksSaga),
    takeEvery(CREATE_TASK_INIT, createTaskSaga),
    takeEvery(UPDATE_TASK_INIT, updateTaskSaga),
    takeEvery(OPEN_MODAL_TASK_INIT, openModalTaskSaga),
    takeEvery(CLOSE_MODAL_TASK_INIT, closeModalTaskSaga),
  ]);
}

export default rootSagas;
