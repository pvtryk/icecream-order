import React from 'react';
import './CheckoutInput.scss';

const CheckoutInput = (props) => {
  let inputEl = null;
  let errorMessage;
  const inputClasses = ['checkout-input__input']

  if (props.additionalClass) {
    inputClasses.push(props.additionalClass);
  }

  if (props.valid && props.touched) {
    inputClasses.push('invalid');
    errorMessage = <span>{props.message}</span>
  }

  switch (props.inputType) {
    case ('input'):
    case ('tel'):
        inputEl = (
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        );
      break;
    
      case ('email'):
        inputEl = (
          <input
            className={inputClasses.join(' ')}
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
      <label className="checkout-input__label">{props.labelEl}</label>
      {inputEl}
      {errorMessage}
    </div>
  );
}

export default CheckoutInput;