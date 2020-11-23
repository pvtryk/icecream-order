import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Boxes from '../../components/Boxes/Boxes';
import Summary from '../../components/Summary/Summary';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';

import * as action from '../../store/actions/index';

import './IcecreamContainer.scss';

class IcecreamContainer extends PureComponent {
  state = {
    purchasable: false,
  };

  componentDidUpdate(prevProps, prevState) {
    this.updatePurchase();

    if (this.props.token !== prevProps.token) {
      this.props.onInitIcecream(this.props.token);
      console.log('xdd');
    }
  }
  
  componentDidMount() {
    // TODO: CHECK IF IT IS CORRECT FIX WHEN PROPS FROM REDUX IS EMPTY
    this.props.onInitIcecream(this.props.token);
    console.log('[icecreamContainer] mounted');
  }
  // componentDidUpdate() {
  //   this.updatePurchase();
  // }

  // update purchasable state
  updatePurchase() {
    let finalValue = 0;

    const cart = {
      ...this.props.cart,
    };

    for (const key in cart) {
      const element = cart[key];
      for (const value in cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
    }

    this.setState({
      purchasable: finalValue > 0,
    });
  }

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
                  render={() => <Boxes purchasable={this.state.purchasable} />}
                />
                <Route
                  path="/checkout"
                  render={() => (
                    <CheckoutContainer
                      {...this.state}
                      isAuthed={true}
                      ic={this.state.icecreams}
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-4 icecreams__summary">
                <Summary purchasable={this.state.purchasable} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    icecreams: state.ic.icecreams,
    cart: state.ic.cart,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitIcecream: (token) => dispatch(action.initIcecream(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamContainer);
