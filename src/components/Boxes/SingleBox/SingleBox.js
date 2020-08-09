import React from 'react';

import './SingleBox.scss';

function SingleBox(props) {
  return (
    <div className="s-box">
      <div className="s-box__image">
        image
      </div>
      <p className="s-box__name">{ props.fullname }</p>
      <div className="s-box__options">
        <div className="s-box__item">
          <p className="s-box__price">{ props.prices.small }</p>
          <button className="s-box__btn">+</button>
          <button className="s-box__btn">-</button>
        </div>
        <div className="s-box__item">
          <p className="s-box__price">{ props.prices.large }</p>
          <button className="s-box__btn">+</button>
          <button className="s-box__btn">-</button>
        </div>
      </div>
    </div>
  )
}

export default SingleBox
