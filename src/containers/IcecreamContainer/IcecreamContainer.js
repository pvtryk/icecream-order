import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Boxes from '../../components/Boxes/Boxes';
import Summary from '../../components/Summary/Summary';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';

import * as actionType from '../../store/actions';

import './IcecreamContainer.scss';

class IcecreamContainer extends Component {
  state = {
    // icecreams: {
    //   carmel: {
    //     shortname: 'carmel',
    //     fullname: 'Carmel',
    //     available: true
    //   },
    //   cream: {
    //     shortname: 'cream',
    //     fullname: 'Cream',
    //     available: true
    //   },
    //   vanilla: {
    //     shortname: 'vanilla',
    //     fullname: 'Vanilla',
    //     available: true
    //   },
    //   whiteChocolate: {
    //     shortname: 'whiteChocolate',
    //     fullname: 'White Chocolate',
    //     available: true
    //   },
    //   chocolate: {
    //     shortname: 'chocolate',
    //     fullname: 'Chocolate',
    //     available: true
    //   },
    // },
    // cart: {
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
    //   chocolate: {
    //     small: 0,
    //     large: 0,
    //   },
    // },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

  componentDidMount = () => {
    // console.log(this.state.cart['cream']['small']);
    console.log('[icecreamContainer] mounted');
  }

  // temporary off
  updatePurchase() {
    // let finalValue = 0;

    // const cart = {
    //   ...this.state.cart,
    // };

    // for (const key in cart) {
    //   const element = cart[key];
    //   for (const value in cart[key]) {
    //     const newValue = element[value];
    //     finalValue += newValue;
    //   }
    // }
    // this.setState({
    //   purchasable: finalValue > 0,
    // });
  }

  // addIcecreamHandler = (shortname, type) => {
  //   // get old value
  //   let oldValue = this.state.cart[shortname][type];
    
  //   // add one to value
  //   const updatedValue = ++oldValue;  
  //   // const updatedValue = oldValue + 1;
  //   // get previous cart object
    
  //   const cart = {
  //     ...this.state.cart
  //   };
  //   // update cart element by new value
  //   cart[shortname][type] = updatedValue;
  //   // set new value
  //   this.setState({ cart });
  //   this.updatePurchase();
  // };

  // removeIcecreamHandler = (shortname, type) => {
  //   let oldValue = this.state.cart[shortname][type];

  //   if (oldValue <= 0) {
  //     return;
  //   }
  //   const updatedValue = --oldValue;
  //   const cart = {
  //     ...this.state.cart
  //   };
  //   cart[shortname][type] = updatedValue;
  //   this.setState({ cart });
  //   this.updatePurchase();
  // };

  render() {
    return (
      <Fragment>
        <div className="icecreams">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-8 icecreams__content">
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Boxes
                      addIcecream={this.props.onIcecreamAdd}
                      removeIcecream={this.removeIcecreamHandler}
                    />
                  )}
                />
                <Route
                  path="/checkout"
                  render={(props) => (
                    <CheckoutContainer
                      {...this.state}
                      isAuthed={true}
                      ic={this.state.icecreams}
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-4 icecreams__relative">
                <Summary
                  // prices={ICECREAM_PRICES}
                  // cart={this.state.cart}
                  // icecreams={this.state.icecreams}
                  purchasable={this.state.purchasable}
                  purchasing={this.state.purchasing}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProaps = state => {
  return {
    icecreams: state.icecreams,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIcecreamAdd: (icName, icSize) => dispatch({ type: actionType.ADD_ICECREAM, icecreamName: icName, icecreamSize: icSize }),
    onIcecreamRemove: (icName, icSize) => dispatch({ type: actionType.REMOVE_ICECREAM, icecreamName: icName, icecreamSize: icSize }),
  };

}

export default connect(mapStateToProaps, mapDispatchToProps)(IcecreamContainer);
