import * as actionType from './actionTypes';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  }
}

export const authSuccess = (token, id) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    id: id
  };
}

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionType.AUTH_INITIATE_LOGOUT,
  };
}

export const logoutSucceed = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
}

export const checkAuthTimeout = (time) => {
  return {
    type: actionType.AUTH_CHECK_TIMEOUT,
    time: time
  };
}

export const auth = (email, pass, formType) => {
  return {
    type: actionType.AUTH,
    email: email,
    pass: pass,
    formType: formType,
  };
}

export const checkAuthOnStart = () => {
  return {
    type: actionType.AUTH_CHECK_ON_START,
  };
}