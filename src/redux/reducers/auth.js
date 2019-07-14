import { updateObject } from 'Utils/helpers';

import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_CHECK_TIMEOUT_INIT,
  AUTH_CHECK_TIMEOUT_SUCCESS,
  AUTH_CHECK_TIMEOUT_FAIL,
} from '../types';

// InitState
const initialState = {
  isAuthenticated: false,
  username: null,
  error: false,
  loading: false,
};

const authInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const authSuccess = state => {
  return updateObject(state, {
    isAuthenticated: true,
    error: false,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

const authLoginInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const authLoginSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    username: action.payload,
    error: false,
    loading: false,
  });
};

const authLoginFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

const authLogoutInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const authLogoutSuccess = state => {
  return updateObject(state, {
    loading: false,
    error: false,
    isAuthenticated: false,
    username: null
  });
};

const authLogoutFail = state => {
  return updateObject(state, {
    error: true,
    loading: false,
  });
};

const authCheckTimeoutInit = state => {
  return updateObject(state, {
    error: false,
    loading: true,
  });
};

const authCheckTimeoutSuccess = state => {
  return updateObject(state, {
    loading: false,
    error: false,
  });
};

const authCheckTimeoutFail = state => {
  return updateObject(state, {
    error: true,
    loading: false,
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_INIT:
      return authInit(state, action);
    case AUTH_LOGOUT_INIT:
      return authLogoutInit(state, action);
    case AUTH_LOGOUT_SUCCESS:
      return authLogoutSuccess(state, action);
    case AUTH_LOGOUT_FAIL:
      return authLogoutFail(state, action);
    case AUTH_LOGIN_INIT:
      return authLoginInit(state, action);
    case AUTH_LOGIN_SUCCESS:
      return authLoginSuccess(state, action);
    case AUTH_LOGIN_FAIL:
      return authLoginFail(state, action);
    case AUTH_CHECK_TIMEOUT_INIT:
      return authCheckTimeoutInit(state, action);
    case AUTH_CHECK_TIMEOUT_SUCCESS:
      return authCheckTimeoutSuccess(state, action);
    case AUTH_CHECK_TIMEOUT_FAIL:
      return authCheckTimeoutFail(state, action);
    default:
      return state;
  }
}
