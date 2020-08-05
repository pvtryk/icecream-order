import React, { Component } from 'react'
import SingleBox from '../../components/Boxes/SingleBox/SingleBox';
import Boxes from '../../components/Boxes/Boxes';

const ICECREAM_PRICES = {
  small: 1200,
  large: 2000
}

class IcecreamContainer extends Component {
  state = {
    icreams: {
      carmel: {
        fullname: 'Carmel',
        available: true
      },
      cream: {
        fullname: 'Cream',
        available: true
      },
      vanilla: {
        fullname: 'Vanilla',
        available: true
      },
      whiteChocolate: {
        fullname: 'White Chocolate',
        available: true
      }
    },
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
      <Boxes 
        prices={ICECREAM_PRICES}
        icecreams={this.state.icecreams}
        selected={this.state.selectedIcecreams}
      />
    );
  }
}

export default IcecreamContainer;