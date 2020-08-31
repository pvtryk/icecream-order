import * as actionType from './actions';

const initialState = {
  prices: {
    small: 12.50,
    large: 20.00,
    // discount: 5
  },
  icecreams: {
    carmel: {
      shortname: 'carmel',
      fullname: 'Carmel',
      available: true,
    },
    cream: {
      shortname: 'cream',
      fullname: 'Cream',
      available: true,
    },
    vanilla: {
      shortname: 'vanilla',
      fullname: 'Vanilla',
      available: true,
    },
    whiteChocolate: {
      shortname: 'whiteChocolate',
      fullname: 'White Chocolate',
      available: true,
    },
    chocolate: {
      shortname: 'chocolate',
      fullname: 'Chocolate',
      available: true,
    },
  },
  cart: {
    carmel: {
      small: 0,
      large: 0,
    },
    cream: {
      small: 0,
      large: 0,
    },
    vanilla: {
      small: 0,
      large: 0,
    },
    whiteChocolate: {
      small: 0,
      large: 0,
    },
    chocolate: {
      small: 0,
      large: 0,
    },
  },
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // adding icecream to redux store
    case actionType.ADD_ICECREAM:
      const addName = action.icecreamName;
      const addSize = action.icecreamSize;
      return {
        ...state,
        cart: {
          ...state.cart,
          [addName]: {
            ...state.cart[addName],
            [addSize]: state.cart[addName][addSize] + 1
          },
        },
        totalPrice: state.totalPrice + state.prices[addSize]
      };
    case actionType.REMOVE_ICECREAM:
      const removeName = action.icecreamName;
      const removeSize = action.icecreamSize;
      return {
        ...state,
        cart: {
          ...state.cart,
          [removeName]: {
            ...state.cart[removeName],
            [removeSize]: state.cart[removeName][removeSize] - 1
          },
        },
      };
    default:
      console.log('????? default reducer ????');
      console.log(action);
      return state;
  }
};

export default reducer;
