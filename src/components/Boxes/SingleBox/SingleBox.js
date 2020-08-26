import React from 'react';

import './SingleBox.scss';
import BoxImage from '../../../assets/images/icecream-box.jpg';

function SingleBox(props) {
  return (
    <div className="s-box">
      <div className="s-box__image">
        <img src={BoxImage} alt=""/>
      </div>
      <p className="s-box__name">{props.fullname}</p>
      <div className="s-box__options">
        <div className="s-box__item">
          <p className="s-box__type">Small</p>
          <button onClick={props.addSmallIcecream} className="s-box__btn">
            +
          </button>
          <button
            onClick={props.removeSmallIcecream}
            disabled={props.cart.small <= 0 ? true : false}
            className="s-box__btn"
          >
            -
          </button>
          <p className="s-box__price">
            {props.prices.small.toFixed(2)} $
          </p>
        </div>
        <div className="s-box__item">
          <p className="s-box__type">Large</p>
          <button onClick={props.addLargeIcecream} className="s-box__btn">
            +
          </button>
          <button
            onClick={props.removeLargeIcecream}
            disabled={props.cart.large <= 0 ? true : false}
            className="s-box__btn"
          >
            -
          </button>
          <p className="s-box__price">
            {props.prices.large.toFixed(2)} $
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleBox
