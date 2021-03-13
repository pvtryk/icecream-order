import * as actionType from './actionTypes';

// POST
export const orderPostStart = () => {
  return {
    type: actionType.ORDER_POST_START,
  };
};

export const orderPostSuccess = () => {
  return {
    type: actionType.ORDER_POST_SUCCESS,
  }
}

export const orderPostFail = (error) => {
  return {
    type: actionType.ORDER_POST_FAIL,
    error: error,
  };
};

export const orderPost = (order, token) => {
  return {
    type: actionType.ORDER_POST,
    order: order,
    token: token,
  };
};

// GET
export const orderGetStart = () => {
  return {
    type: actionType.ORDER_GET_START
  }
}

export const orderGetSuccess = (data) => {
  return {
    type: actionType.ORDER_GET_SUCCESS,
    data: data
  }
}

export const orderGetFail = (error) => {
  return {
    type: actionType.ORDER_GET_FAIL,
    error: error
  }
}

export const orderGet = (token, userId) => {
  return {
    type: actionType.ORDER_GET,
    token: token,
    userId: userId,
  };
};
