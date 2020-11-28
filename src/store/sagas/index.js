import { takeEvery } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  checkAuthOnStartSaga,
} from './auth';

import { icecreamInitSaga } from './icecreams';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionType.AUTH, authSaga);
  yield takeEvery(actionType.AUTH_CHECK_ON_START, checkAuthOnStartSaga);
}

export function* watchIcecreams() {
  yield takeEvery(actionType.ICECREAM_INIT, icecreamInitSaga)
}