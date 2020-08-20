import React from 'react';
import CheckoutItem from './CheckoutItem/CheckoutItem';

import './Checkout.scss';

function Checkout(props) {  
  const isSomething = (
    <div className="checkout__info">
      <p>Your cart is empty</p>
    </div>
  );

  const cart = props.cart;
  const icecreams = props.icecreams;

  const summary = Object.keys(cart)
    .map(igKey => {
      return [...Array(props.cart[igKey])].map(value => {
        if (value.small >= 1 || value.large >= 1) {
          return (
            <CheckoutItem
              key={icecreams[igKey].shortname}
              prices={props.prices}
              small={value.small}
              large={value.large}
              name={icecreams[igKey].fullname}
            />
          );
        }
      });
    });

  console.log(summary);
  

  return (
    <div className="checkout">
      <h2 className="checkout__title">Your Order</h2>

      {!props.purchasable && isSomething}

      <ol className="checkout__list">
        {summary}
      </ol>
    </div>
  );
}

export default Checkout;