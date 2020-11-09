import * as actionType from '../actions/actionTypes';

const initialState = {
  icecreams: {},
  cart: {},
  totalPrice: 0,
  fetchError: false
};

const addIcecream = (state, action) => {
  const addName = action.icecreamName;
  const addSize = action.icecreamSize;
  const addPrice = action.icecreamPrice;

  return {
    ...state,
    cart: {
      ...state.cart,
      [addName]: {
        ...state.cart[addName],
        [addSize]: state.cart[addName][addSize] + 1,
      },
    },
    totalPrice: state.totalPrice + addPrice,
  };
}

const removeIcecream = (state, action) => {
  const removeName = action.icecreamName;
  const removeSize = action.icecreamSize;
  const removePrice = action.icecreamPrice;

  return {
    ...state,
    cart: {
      ...state.cart,
      [removeName]: {
        ...state.cart[removeName],
        [removeSize]: state.cart[removeName][removeSize] - 1,
      },
    },
    totalPrice: state.totalPrice - removePrice,
  };
}

const setIcecream = (state, action) => {
  const icecreamsValues = Object.values(action.icecream);
  console.log(icecreamsValues);
  let updatedCart = {}

  for (const key in icecreamsValues) {
    const name = icecreamsValues[key].shortname;
    const element = icecreamsValues[key].variation;

    for (const variation in element) {
      const singleElement = element[variation];

      updatedCart[name] =  {
        ...updatedCart[name],
        [singleElement.type]: 0
      }
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
