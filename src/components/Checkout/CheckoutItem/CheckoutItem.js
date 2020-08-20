import React from 'react';
import './CheckoutItem.scss';

function CheckoutItem(props) {
  const price = (props.prices.small / 100);
  console.log(price);
  return (
    <li className="checkout-item">
      <span className="checkout-item__name">{props.name}</span>
      {props.small >= 1 ? (
        
        <span className="checkout-item__wrap">
          <span className="checkout-item__value">Small: {props.small} x {(props.prices.small / 100).toFixed(2)} $</span>
          <span className="checkout-item__price">{props.small * price}</span>

        </span>
      ) : ''}
      {props.large >= 1 ? (
        <span className="checkout-item__value">Large: {props.large} x {(props.prices.large / 100).toFixed(2)} $</span>
      ) : ''}
    </li>
  );
}


export default CheckoutItem;
