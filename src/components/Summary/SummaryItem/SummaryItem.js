import React from 'react';
import './SummaryItem.scss';

function SummaryItem(props) {

  return (
    <li className="summary-item">
      <span className="summary-item__name">
        <strong>{ props.name }</strong>{props.size}
      </span>
      {/* <span>{props.size} x{props.value} - {props.price.toFixed(2)}</span> */}
      <span className="summary-item__wrap">
        <span className="summary-item__value">
          {props.value} x {props.price.toFixed(2)} $
        </span>
        <span className="summary-item__price">
          {(props.value * props.price).toFixed(2)} $
        </span>
      </span>
    </li>
  );
}


export default SummaryItem;
