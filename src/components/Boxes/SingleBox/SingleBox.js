import React from 'react'

function SingleBox(props) {
  return (
    <div className="e-box">
      <div className="e-box__image">

      </div>
      <p className="e-box__name">{ props.fullname }</p>
      <div className="e-box__options">
        <div className="e-box__item">
          <p className="e-box__price">{ props.prices.small }</p>
          <button className="e-box__btn">+</button>
          <button className="e-box__btn">-</button>
        </div>
        <div className="e-box__item">
          <p className="e-box__price">{ props.prices.large }</p>
          <button className="e-box__btn">+</button>
          <button className="e-box__btn">-</button>
        </div>
      </div>
    </div>
  )
}

export default SingleBox
