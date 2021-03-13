import { put } from 'redux-saga/effects';
import axios from '../../axios/axios';
import history from "../../history";

import * as actions from '../actions/index';

export function* orderPostSaga(action) {

  yield put(actions.orderPostStart());

  try {
    yield axios.post(`/orders.json?auth=${action.token}`, action.order);
    yield put(actions.orderPostSuccess());
    history.push('/thank-you');

  } catch (error) {
    yield put(actions.orderPostFail(error.response));
  }
}

export function* orderGetSaga(action) {
  yield put(actions.orderGetStart());

  try {
    const response = yield axios.get(`/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`);
    yield put(actions.orderGetSuccess(response.data));

  } catch (error) {
    yield put(actions.orderGetFail(error.response));
  }
}
