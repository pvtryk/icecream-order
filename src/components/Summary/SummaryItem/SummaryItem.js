import React from 'react';
import './SummaryItem.scss';

const SummaryItem = props => {

  return (
    <li className="summary-item">
      <p className="summary-item__name">
        <strong>{ props.name }</strong>{props.size}
      </p>
      {/* <span>{props.size} x{props.value} - {props.price.toFixed(2)}</span> */}
      <span className="summary-item__wrap">
        <p className="summary-item__value">
          {props.value} x {props.price.toFixed(2)} $
        </p>
        <p className="summary-item__price">
          {(props.value * props.price).toFixed(2)} $
        </p>
      </span>
    </li>
  );
}


export default SummaryItem;
