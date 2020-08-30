import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SummaryItem from './SummaryItem/SummaryItem';

import './Summary.scss';

function Summary(props) {
  
  const isSomething = (
    <div className="summary__info">
      <p>Your cart is empty</p>
    </div>
  );

  const {cart, icecreams, prices} = props;
  let small = 0;
  let large = 0;

  const summaryItems = Object.keys(cart)
    .map(igKey => {
      return [...Array(cart[igKey])].map(value => {
        if (value.small >= 1 || value.large >= 1) {
          small = small + value.small;
          large = large + value.large;

          return (
            <SummaryItem
            key={icecreams[igKey].shortname}
            prices={prices}
            small={value.small}
            large={value.large}
            name={icecreams[igKey].fullname}
            />
          );
        }
        return false;
      });
    });
   
  let finalPrice = (small * prices.small + large * prices.large).toFixed(2);
  let isDiscount = false;

  // TODO: after implement reducer, dicount not working
  if (small + large >= 10) {
    finalPrice = (finalPrice * ( 1 - prices.discount / 100)).toFixed(2);
    isDiscount = true;
  }

  return (
    <div className="summary">
      <h2 className="summary__title">Your Order</h2>

      {!props.purchasable && isSomething}

      <ol className="summary__list">{summaryItems}</ol>

      {props.purchasable && (
        <div className="summary__footer">
          <div className="summary__summary">
            <p>Summary: {finalPrice} $</p>
            {isDiscount && (
              <p>Your discount: {prices.discount}%</p>
            )}
            <div className="summary__btn-wrap">
              <Link to="/checkout" className="summary__btn">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProaps = (state) => {
  return {
    prices: state.prices,
    icecreams: state.icecreams,
    cart: state.cart,
  };
};



export default connect(mapStateToProaps, null)(Summary);