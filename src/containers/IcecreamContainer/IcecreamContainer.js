import React, { Component, Fragment } from 'react'
import Boxes from '../../components/Boxes/Boxes';
import Checkout from '../../components/Checkout/Checkout'

const ICECREAM_PRICES = {
  small: 1200,
  large: 2000
}

class IcecreamContainer extends Component {
  state = {
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
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

  addSmallIcecreamHandler = (shortname, type) => {
    console.log('addSmallIcecreamHandler:', shortname);

    // ADD TYPE
    // get old value
    let oldValue = this.state.cart[shortname]['small'];
    console.log('oldValue is', oldValue);

    // add one to value
    const updatedValue = ++oldValue;
    // const updatedValue = oldValue + 1;
    console.log('updatedValue', updatedValue);

    // get previous cart object
    const cart = {
      ...this.state.cart
    }
    console.log('cart', cart);

    // update cart element by new value
    cart[shortname].small = updatedValue;

    // set new value
    this.setState({cart});
  };

  removeSmallIcecreamHandler = (shortname) => {
    console.log('removeSmallIcecreamHandler:', shortname);
  };

  render() {
    return (
      <Fragment>
        <Boxes
          prices={ICECREAM_PRICES}
          icecreams={this.state.icecreams}
          cart={this.state.cart}
          addSmallIcecream={this.addSmallIcecreamHandler}
          removeSmallIcecream={this.removeSmallIcecreamHandler}
        />
        <Checkout />
      </Fragment>
    );
  }
}

export default IcecreamContainer;
