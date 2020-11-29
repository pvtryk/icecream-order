import { put } from 'redux-saga/effects';
import axios from '../../axios/axios-orders';

import * as actions from '../actions/index';

export function* orderPostSaga(action) {

  yield put(actions.orderPostStart());

  const order = {
    formData: action.formData,
    cart: action.cart,
    price: action.price,
    userId: action.userId,
  };

  try {
    yield axios.post(`/orders.json?auth=${action.token}`, order);
    yield put(actions.orderPostSuccess());

  } catch (error) {
    // TODO: check error text
    yield put(actions.orderPostFail(error.response.data.error));
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