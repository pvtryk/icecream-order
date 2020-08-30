import React from 'react'
import './Button.scss';

const Button = (props) => {
  return (
    <div className="button">
      <button className="button__btn" type="submit">
        {props.name}
      </button>
    </div>
  )
}

export default Button
