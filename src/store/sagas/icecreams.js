import { put } from 'redux-saga/effects';
import axios from '../../axios/axios-icecreams';

import * as actions from '../actions/index';

export function* icecreamInitSaga(action) {
  try {
    const response = yield axios.get(`icecreams.json?auth=${action.token}`);
    yield put(actions.setIcecream(response.data));

  } catch (error) {
    yield put(actions.fetchFailIcecream());
  }
}