import * as actionType from './actionTypes';

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
    icecreamSize: icSize,
  };
}