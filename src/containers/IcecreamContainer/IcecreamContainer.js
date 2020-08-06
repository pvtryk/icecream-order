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
        fullname: 'Carmel',
        available: true,
      },
      cream: {
        fullname: 'Cream',
        available: true,
      },
      vanilla: {
        fullname: 'Vanilla',
        available: true,
      },
      whiteChocolate: {
        fullname: 'White Chocolate',
        available: true,
      },
    },
    // selectedIcecreams: {
    //   carmel: {
    //     small: 0,
    //     large: 0,
    //   },
    //   cream: {
    //     small: 0,
    //     large: 0,
    //   },
    //   vanilla: {
    //     small: 0,
    //     large: 0,
    //   },
    //   whiteChocolate: {
    //     small: 0,
    //     large: 0,
    //   },
    // },
    // icecreams: {
    //   carmel: 1,
    //   cream: 1,
    //   vanilla: 1,
    //   whiteChocolate: 3,
    // },
    selectedIcecreams: {
      carmel: 0,
      cream: 0,
      vanilla: 0,
      whiteChocolate: 0,
    },
    purchasable: false,
    purchasing: false,
  };

  addIcecreamHandler = (type) => {
    console.log('addIcecreamHandler');
  };

  removeIcecreamHandler = (type) => {
    console.log('removeIcecreamHandler');
  };

  render() {
    return (
      <Fragment>
        <Boxes
          prices={ICECREAM_PRICES}
          icecreams={this.state.icecreams}
          selected={this.state.selectedIcecreams}
        />
        <Checkout />
      </Fragment>
    );
  }
}

export default IcecreamContainer;