import React, {Fragment, useCallback, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Boxes from '../../components/Boxes/Boxes';
import Summary from '../../components/Summary/Summary';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';

import * as action from '../../store/actions/index';

import './ProductsContainer.scss';

const ProductsContainer = props => {
  const [purchasable, setPurchasable] = useState(false);
  const {cart, token, history, onIcecreamInit, closeSummary} = props;

  // update purchasable state
  const updatePurchase = useCallback(() => {
    let finalValue = 0;

    for (const key in cart) {
      const element = cart[key];

      for (const value in cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
    }

    setPurchasable(finalValue > 0);
  }, [cart]);

  useEffect(() => {
    if (token) {
      onIcecreamInit(token);
    }

    if (token === null) {
      history.push('/auth');
    }
  }, [token, onIcecreamInit, history]);

  useEffect(() => {
      updatePurchase();
  }, [updatePurchase]);

  useEffect(() => {
    closeSummary();
  }, [history.location.pathname, closeSummary]);

  return (
      <Fragment>
        <div className="products">
          <div className="products__inner">
            <div className="products__mask"></div>
            <div className="products__content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Boxes
                      purchasable={purchasable}
                      icecreams={props.icecreams}
                      cart={props.cart}
                      prices={props.prices}
                      fetchError={props.fetchError}
                    />
                  )}
                />
                <Route
                  path="/checkout"
                  render={() => (
                    <CheckoutContainer
                      purchasable={purchasable}
                      // isAuthed={true}
                    />
                  )}
                />
              </Switch>
            </div>
            <div className="products__summary">
              <Summary purchasable={purchasable} />
            </div>
          </div>
        </div>
      </Fragment>
  );

}


const mapStateToProps = state => {
  return {
    icecreams: state.ic.icecreams,
    cart: state.ic.cart,
    token: state.auth.token,
    prices: state.ic.prices,
    fetchError: state.ic.fetchError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIcecreamInit: (token) => dispatch(action.icecreamInit(token)),
    closeSummary: () => dispatch(action.closeSummary())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
