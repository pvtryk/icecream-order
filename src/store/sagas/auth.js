import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('userId');
  yield localStorage.removeItem('expiresDate');

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.time * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());

  const userData = {
    email: action.email,
    password: action.pass,
    returnSecureToken: true,
  };

  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZpy3lK4ItxEbC_zDOWRhRjIwEneEhRA8';
  if (action.formType) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZpy3lK4ItxEbC_zDOWRhRjIwEneEhRA8';
  }

  try {
    const response = yield axios.post(url, userData);
    const expDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('userId', response.data.localId);
    yield localStorage.setItem('expiresDate', expDate);
    
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));

  } catch (error) {
    yield put(actions.authFail(error.response.error));
  }
}

export function* checkAuthOnStartSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token) {
      yield put(actions.logout());
    } else {
      const expiresDate = yield new Date(localStorage.getItem('expiresDate'));
      const userId = yield localStorage.getItem('userId');

      if (expiresDate <= new Date()) {
        yield put(actions.logout());
      } else {
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout( (expiresDate.getTime() - new Date().getTime()) / 1000) );
      }
    }
}