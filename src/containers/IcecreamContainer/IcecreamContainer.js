import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Boxes from '../../components/Boxes/Boxes';
import Summary from '../../components/Summary/Summary';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';

import * as action from '../../store/actions/index';

import './IcecreamContainer.scss';

const IcecreamContainer = props => {
  const [purchasable, setPurchasable] = useState(false);

  // update purchasable state
  const updatePurchase = () => {
    let finalValue = 0;

    const cart = props.cart;

    for (const key in cart) {
      const element = cart[key];

      for (const value in cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
    }

    setPurchasable(finalValue > 0);
  }

  useEffect(() => {

    if (props.token) {
      props.onIcecreamInit(props.token);
    }

    if (props.token === null) {
      props.history.push('/auth');
    }
  }, [props.token]);

  useEffect(() => {
    // if (Object.getOwnPropertyNames(props.cart).length !== 0) {
      updatePurchase();
    // }
  }, [props.cart]);

  return (
      <Fragment>
        <div className="icecreams">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-8 icecreams__content">
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
                            isAuthed={true}
                        />
                    )}
                />
              </div>
              <div className="col-12 col-lg-4 icecreams__summary">
                <Summary purchasable={purchasable} />
              </div>
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
    onIcecreamInit: (token) => dispatch(action.icecreamInit(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamContainer);
