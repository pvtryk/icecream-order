import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  }
}

export const authSuccess = (authData) => {
  console.log(authData);
  const token = authData.idToken;
  const id = authData.localId;

  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    id: id
  };
}

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error.response.data.error
  }
}

export const logout = () => {
  console.log('xdd');
  return {
    type: actionType.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (time) => {
  console.log(time)
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  }
}

export const auth = (email, pass, type) => {
  return dispatch => {
    dispatch(authStart());

    const userData = {
      email: email,
      password: pass,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZpy3lK4ItxEbC_zDOWRhRjIwEneEhRA8'
    if (type) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZpy3lK4ItxEbC_zDOWRhRjIwEneEhRA8';
    }
    
    axios.post(url, userData)
    .then(res => {
      dispatch(authSuccess(res.data));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch(error => {
      dispatch(authFail(error));
    });

  }
}