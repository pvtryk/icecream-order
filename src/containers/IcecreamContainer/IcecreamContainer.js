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

  

  updatePurchase () {
    let finalValue = 0;

    const cart = {
      ...this.state.cart
    }
    // const values = Object.values(cart);

    for (const key in cart) {
      const element = cart[key]
      for (const value in cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
    }
    
    console.log(finalValue);


    // for (const key in cart) {
    //   let value = Object.values(cart[key]).map(val => val).reduce((sum, el) => {
    //     return sum + el
    //   }, 0);
    //   console.log(value);
    // }
  }

  addIcecreamHandler = (shortname, type) => {
    // get old value
    let oldValue = this.state.cart[shortname][type];
    // add one to value
    const updatedValue = ++oldValue;
    // const updatedValue = oldValue + 1;
    // get previous cart object
    const cart = {
      ...this.state.cart
    }
    // update cart element by new value
    cart[shortname][type] = updatedValue;
    // set new value
    this.setState({cart});
    this.updatePurchase();
  };

  removeIcecreamHandler = (shortname, type) => {
    let oldValue = this.state.cart[shortname][type];

    if (oldValue <= 0) {
      return;
    }
    const updatedValue = --oldValue;
    const cart = {
      ...this.state.cart
    }
    cart[shortname][type] = updatedValue;
    this.setState({cart});
    this.updatePurchase();
  };

  render() {

    return (
      <Fragment>
        <Boxes
          prices={ICECREAM_PRICES}
          icecreams={this.state.icecreams}
          cart={this.state.cart}
          addIcecream={this.addIcecreamHandler}
          removeIcecream={this.removeIcecreamHandler}
        />
        <Checkout />


      </Fragment>
    );
  }
}

export default IcecreamContainer;
