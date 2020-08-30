import React from 'react';
import './CheckoutInput.scss';

const CheckoutInput = (props) => {
  let inputEl = null;

  switch (props.inputType) {
    case ('input'):
        inputEl = (
          <input
            className={`checkout-input__input ${props.additionalClass} `}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        );
      break;
    
      case ('email'):
        inputEl = (
          <input
            className="checkout-input__input"
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        );
      break;

    case ('textarea'):
      inputEl = <textarea />
      break;

    default:
      break;
  }

  return (
    <div className="checkout-input">
      <label className="checkout-input__label">{ props.labelEl }</label>
      {inputEl}
    </div>
  )
}

export default CheckoutInput;