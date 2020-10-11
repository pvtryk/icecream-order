import * as actionType from './actionTypes';
import axios from '../../axios/axios-icecreams';

export const addIcecream = (icName, icSize) => {
  return {
    type: actionType.ADD_ICECREAM,
    icecreamName: icName,
    icecreamSize: icSize
  }
}

export const removeIcecream = (icName, icSize) => {
  return {
    type: actionType.REMOVE_ICECREAM,
    icecreamName: icName,
    icecreamSize: icSize
  };
}

export const setIcecream = (icecream) => {
  return {
    type: actionType.SET_ICECREAM,
    icecream: icecream
  };
};

export const fetchFailIcecream = () => {
  return {
    type: actionType.FETCH_FAIL_ICECREAM
  }
}

export const initIcecream = () => {
  return dispatch => {
    axios.get('icecreams.json')
      .then(res => {
        console.log('res', res);
        dispatch(setIcecream(res.data));
      })
      .catch(err => {
        dispatch(fetchFailIcecream());
        console.log('err', err);
      })
  }
}
