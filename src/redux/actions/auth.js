import {
  AUTH_INIT,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_CHECK_TIMEOUT_INIT,
  AUTH_CHECK_TIMEOUT_SUCCESS,
  AUTH_CHECK_TIMEOUT_START,
  AUTH_CHECK_TIMEOUT_FAIL,
} from '../types';

export const authInit = history => {
  return { type: AUTH_INIT, payload: { history } };
};

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = data => {
  return { type: AUTH_SUCCESS, payload: data };
};

export const authFail = data => {
  return { type: AUTH_FAIL, payload: data };
};

export const authLogoutInit = history => {
  return { type: AUTH_LOGOUT_INIT, payload: { history } };
};

export const authLogoutStart = () => {
  return { type: AUTH_LOGOUT_START };
};

export const authLogoutSuccess = () => {
  return { type: AUTH_LOGOUT_SUCCESS };
};

export const authLogoutFail = () => {
  return { type: AUTH_LOGOUT_FAIL };
};

export const authCheckTimeoutStart = () => {
  return { type: AUTH_CHECK_TIMEOUT_START };
};

export const authCheckTimeoutSuccess = () => {
  return { type: AUTH_CHECK_TIMEOUT_SUCCESS };
};

export const authCheckTimeoutFail = () => {
  return { type: AUTH_CHECK_TIMEOUT_FAIL };
};

export const authCheckTimeoutInit = (expirationTime, history) => {
  return { type: AUTH_CHECK_TIMEOUT_INIT, payload: { expirationTime, history } };
};

export const authLoginInit = (user, history) => {
  return { type: AUTH_LOGIN_INIT, payload: { user, history } };
};

export const authLoginStart = () => {
  return { type: AUTH_LOGIN_START };
};

export const authLoginSuccess = data => {
  return { type: AUTH_LOGIN_SUCCESS, payload: data };
};

export const authLoginFail = data => {
  return { type: AUTH_LOGIN_FAIL, payload: data };
};
