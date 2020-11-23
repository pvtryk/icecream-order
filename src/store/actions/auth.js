import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  }
}

export const authSuccess = (token, id) => {
  // const token = authData.idToken;
  // const id = authData.localId;

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
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiresDate');
  
  return {
    type: actionType.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (time) => {
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
      const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
      // save data to localStorage
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expiresDate', expDate);

      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch(error => {
      dispatch(authFail(error));
    });

  }
}

export const checkAuthOnStart = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout);
    } else {
      const expiresDate = new Date(localStorage.getItem('expiresDate'));
      const userId = localStorage.getItem('userId');
      
      if (expiresDate <= new Date()) {
        dispatch(logout);
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            ( expiresDate.getTime() - new Date().getTime() ) / 1000
          )
        );
      }
    }
  }
}