import * as actionType from '../actions/actionTypes';

const initialState = {
  postError: null,
  postLoading: false,
  getError: null,
  getLoading: false,
  userOrders: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ORDER_POST_START:
      console.log('start');
      return {
        ...state,
        postError: null,
        postLoading: true,
      };
    case actionType.ORDER_POST_SUCCESS:
      console.log('sukces');
      return {
        ...state,
        postLoading: false,
        postError: null,
      };
    case actionType.ORDER_POST_FAIL:
      console.log('fail');
      return {
        ...state,
        postLoading: false,
        postError: action.error,
      };
    case actionType.ORDER_GET_START:
      return {
        ...state,
        getError: null,
        getLoading: true
      };
    case actionType.ORDER_GET_SUCCESS:
      return {
        ...state,
        getError: null,
        getLoading: false,
        userOrders: action.data
      };
      case actionType.ORDER_GET_FAIL:
        return {
          ...state,
          getError: action.error,
          getLoading: false,
          userOrders: initialState.userOrders
        }
    default:
      return state;
  }
};

export default reducer;
