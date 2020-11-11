import * as actionType from './actionTypes';
import axios from '../../axios/axios-icecreams';

export const addIcecream = (icName, icSize, icPrice) => {
  return {
    type: actionType.ADD_ICECREAM,
    icecreamName: icName,
    icecreamSize: icSize,
    icecreamPrice: icPrice
  };
};

export const removeIcecream = (icName, icSize, icPrice) => {
  return {
    type: actionType.REMOVE_ICECREAM,
    icecreamName: icName,
    icecreamSize: icSize,
    icecreamPrice: icPrice
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

export const openSummary = (summaryType) => {
  return {
    type: actionType.OPEN_SUMMARY,
    summaryType: summaryType,
  };
}