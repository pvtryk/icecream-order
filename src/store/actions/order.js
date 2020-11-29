import * as actionType from './actionTypes';

// POST
export const orderPostStart = () => {
  console.log('order Post Start');
  return {
    type: actionType.ORDER_POST_START,
  };
};

export const orderPostSuccess = () => {
  console.log('order Post Success');
  return {
    type: actionType.ORDER_POST_SUCCESS,
  }
}

export const orderPostFail = (error) => {
  console.log('order Post Fail');
  return {
    type: actionType.ORDER_POST_FAIL,
    error: error,
  };
};

export const orderPost = (formData, cart, price, token, userId) => {
  console.log('MAIN - ORDER POST');
  return {
    type: actionType.ORDER_POST,
    formData: formData,
    cart: cart,
    price: price,
    token: token,
    userId: userId,
  };
};

// GET
export const orderGetStart = () => {
  console.log('get start');
  return {
    type: actionType.ORDER_GET_START
  }
}

export const orderGetSuccess = (data) => {
  console.log('get success', data);
  return {
    type: actionType.ORDER_GET_SUCCESS,
    data: data
  }
}

export const orderGetFail = (error) => {
  console.log('get fail');
  return {
    type: actionType.ORDER_GET_FAIL,
    error: error
  }
}

export const orderGet = (token, userId) => {
  console.log('MAIN - order get');
  return {
    type: actionType.ORDER_GET,
    token: token,
    userId: userId,
  };
};