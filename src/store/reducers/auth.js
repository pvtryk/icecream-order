import * as actionType from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      }

    case actionType.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        id: action.id,
        error: null, 
        loading: false
      }
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        id: null
      }

    default:
      return state;  
  }
}

export default reducer;