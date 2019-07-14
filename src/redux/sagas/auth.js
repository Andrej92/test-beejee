import fetch from 'isomorphic-fetch';
import { put, call, delay } from 'redux-saga/effects';
import promise from 'es6-promise';
import config from 'Config';

import {
  authInit,
  authStart,
  authFail,
  authSuccess,
  authLogoutInit,
  authLogoutStart,
  authLogoutSuccess,
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authCheckTimeoutInit,
  authCheckTimeoutStart,
  authCheckTimeoutSuccess,
} from '../actions';

promise.polyfill();

/**
 * Logout user from app and redirect to login page
 * @param {Object} action
 */
export function* authLogoutSaga(action) {
  yield put(authLogoutStart());
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('username');
  yield localStorage.removeItem('expirationDate');
  yield put(authLogoutSuccess());
  yield action.payload.history.push('/');
}

/**
 * Set logout timer
 * @param {Object} action
 */
export function* authCheckTimeoutSaga(action) {
  yield put(authCheckTimeoutStart());
  yield delay(action.payload.expirationTime);
  yield put(authCheckTimeoutSuccess());
  yield put(authInit(action.payload.history));
}

/**
 * Login user in app
 * @param {Object} action
 */
export function* authLoginSaga(action) {
  yield put(authLoginStart());
  const { apiUrl, developer } = config;
  const { username, password } = action.payload.user;
  const user = new FormData();
  user.append('username', username);
  user.append('password', password);
  try {
    const response = yield fetch(`${apiUrl}login?developer=${developer}`, {
      method: 'POST',
      body: user,
    });

    const data = yield call([response, response.json]);

    if (data.status !== 'ok') {
      yield put(authLoginFail(data.message));
    } else {
      const expirationDate = yield new Date(new Date().getTime() + config.expirationDate);
      yield localStorage.setItem('token', data.message.token);
      yield localStorage.setItem('expirationDate', expirationDate);
      yield localStorage.setItem('username', username);
      yield put(authLoginSuccess({ username }));
      yield put(authCheckTimeoutInit(expirationDate, action.payload.history));
      yield action.payload.history.push('/');
    }
  } catch (error) {
    yield put(authLoginFail(error.message));
  }
}

/**
 * Check auth status of current user
 * @param {Object} action
 */
export function* authCheckStateSaga(action) {
  yield put(authStart());
  const pathToRedirect = action.payload.history.location.pathname;

  const token = yield localStorage.getItem('token');

  if (!token) {
    yield put(authFail('You must authenticate to get admin rules'));
    yield put(authLogoutInit(action.payload.history));
  }

  if (token) {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

    if (expirationDate <= new Date()) {
      yield put(authFail('Token has been expired'));
      yield put(authLogoutSuccess(action.payload.history));
    } else {
      yield put(authSuccess({}));
      yield put(
        authCheckTimeoutInit(
          expirationDate.getTime() - new Date().getTime(),
          action.payload.history,
        ),
      );
      yield action.payload.history.push(pathToRedirect);
    }
  }
}
