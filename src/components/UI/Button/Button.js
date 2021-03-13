import React from 'react'
import './Button.scss';

const Button = (props) => {
  const {name, disabled, types } = props;
  const classes = ['button__btn'];

  if (types) {
    types.map(single => classes.push(`button__btn--${single}`) );
  }

  return (
    <div className="button">
      <button className={classes.join(' ')} type="submit" disabled={disabled} >
        {name}
      </button>
    </div>
  )
}

export default Button
