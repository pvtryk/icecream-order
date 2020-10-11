import * as actionType from '../actions/actionTypes';

const initialState = {
  prices: {
    small: 12.5,
    large: 20.0,
    // discount: 5
  },
  icecreams: {},
  cart: {},
  totalPrice: 0,
  fetchError: false
};

const addIcecream = (state, action) => {
  const addName = action.icecreamName;
  const addSize = action.icecreamSize;  
  // console.log('WARTOŚCI', 'name:', addName, "size:", addSize);
  // console.log('AKCJA', action, 'AKTUALNE', state);

  return {
    ...state,
    cart: {
      ...state.cart,
      [addName]: {
        ...state.cart[addName],
        [addSize]: state.cart[addName][addSize] + 1,
      },
    },
    totalPrice: state.totalPrice + state.prices[addSize],
  };
}

const removeIcecream = (state, action) => {
  const removeName = action.icecreamName;
  const removeSize = action.icecreamSize;
  return {
    ...state,
    cart: {
      ...state.cart,
      [removeName]: {
        ...state.cart[removeName],
        [removeSize]: state.cart[removeName][removeSize] - 1,
      },
    },
  };
}

const setIcecream = (state, action) => {
  const icecreamsKeys = Object.keys(action.icecream);
  let updatedCart = {}

  for (const key in icecreamsKeys) {
    const element = icecreamsKeys[key];

    updatedCart[element] = {
      small: 0,
      large: 0
    }
  }


  return {
    ...state,
    icecreams: action.icecream,
    cart: updatedCart,
    totalPrice: initialState.totalPrice,
    fetchError: false,
  };
}

const fetchFailIcecream = (state, action) => {
  return {
    ...state,
    fetchError: true
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_ICECREAM:
      return addIcecream(state, action);
    case actionType.REMOVE_ICECREAM:
      return removeIcecream(state, action);
    case actionType.SET_ICECREAM:
      return setIcecream(state, action);
    case actionType.FETCH_FAIL_ICECREAM:
      return fetchFailIcecream(state, action);
    default:
      return state;
  }
};

export default reducer;
