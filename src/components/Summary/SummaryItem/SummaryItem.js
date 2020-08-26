import React from 'react';
import './SummaryItem.scss';

function SummaryItem(props) {
  const smallPrice = props.prices.small;
  const largePrice = props.prices.large;


  return (
    <li className="summary-item">
      <span className="summary-item__name">{props.name}</span>
      {props.small >= 1 ? (
        
        <span className="summary-item__wrap">
          <span className="summary-item__value">Small: {props.small} x {smallPrice.toFixed(2)} $</span>
          <span className="summary-item__price">{(props.small * smallPrice).toFixed(2)} $</span>
        </span>
      ) : ''}
      {props.large >= 1 ? (
        <span className="summary-item__wrap">
          <span className="summary-item__value">Large: {props.large} x {largePrice.toFixed(2)} $</span>
          <span className="summary-item__price">{(props.large * largePrice).toFixed(2)} $</span>
        </span>
      ) : ''}
    </li>
  );
}


export default SummaryItem;
