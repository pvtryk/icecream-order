import * as actionType from './actions';

const initialState = {
  prices: {
    small: 12.50,
    large: 20.00,
    discount: 5
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
      const name = action.icecreamName;
      const size = action.icecreamSize;
      console.log('reducer.js -  name:', name, size);
      return {
        ...state,
        cart: {
          ...state.cart,
          [name]: {
            ...state.cart[name],
            [size]: state.cart[name][size] + 1
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
