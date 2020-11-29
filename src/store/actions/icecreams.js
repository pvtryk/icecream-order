import * as actionType from './actionTypes';


export const addIcecream = (icName, icSize, icPrice) => {
  return {
    type: actionType.ICECREAM_ADD,
    icecreamName: icName,
    icecreamSize: icSize,
    icecreamPrice: icPrice
  };
};

export const removeIcecream = (icName, icSize, icPrice) => {
  return {
    type: actionType.ICECREAM_REMOVE,
    icecreamName: icName,
    icecreamSize: icSize,
    icecreamPrice: icPrice
  };
}

export const setIcecream = (icecream) => {
  return {
    type: actionType.ICECREAM_SET,
    icecream: icecream
  };
};

export const fetchFailIcecream = () => {
  return {
    type: actionType.ICECREAM_FETCH_FAIL
  }
}

export const icecreamInit = (token) => {
  return {
    type: actionType.ICECREAM_INIT,
    token: token
  };
}

export const openSummary = (summaryType) => {
  return {
    type: actionType.SUMMARY_OPEN,
    summaryType: summaryType,
  };
}