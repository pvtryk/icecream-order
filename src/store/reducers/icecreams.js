import * as actionType from '../actions/actionTypes';

const initialState = {
  icecreams: {},
  cart: {},
  totalPrice: 0,
  fetchError: false,
  summaryType: false
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
    icecreams: {},
    cart: {},
    totalPrice: 0,
    fetchError: true,
  };
}

const openSummary = (state, action) => {
  return {
    ...state,
    summaryType: !state.summaryType,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ICECREAM_ADD:
      return addIcecream(state, action);
    case actionType.ICECREAM_REMOVE:
      return removeIcecream(state, action);
    case actionType.ICECREAM_SET:
      return setIcecream(state, action);
    case actionType.ICECREAM_FETCH_FAIL:
      return fetchFailIcecream(state, action);
    case actionType.SUMMARY_OPEN:
      return openSummary(state, action);
    default:
      return state;
  }
};

export default reducer;
