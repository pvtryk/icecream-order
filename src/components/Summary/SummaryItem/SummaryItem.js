import React from 'react';
import './SummaryItem.scss';

const SummaryItem = props => {
  const {name, size, value, price} = props;

  return (
    <li className="summary-item">
      <p className="summary-item__name">
        <strong>{ name }</strong>{size}
      </p>
      <span className="summary-item__wrap">
        <p className="summary-item__value">
          {value} x {price.toFixed(2)} $
        </p>
        <p className="summary-item__price">
          {(value * price).toFixed(2)} $
        </p>
      </span>
    </li>
  );
}

export default SummaryItem;
