import React from 'react';
import './CheckoutInput.scss';

const CheckoutInput = (props) => {
  let inputEl = null;
  let errorMessage;
  let tipMessage;
  const inputClasses = ['checkout-input__input']

  if (props.additionalClass) {
    inputClasses.push(props.additionalClass);
  }

  if (props.valid && props.touched) {
    inputClasses.push('invalid');
    errorMessage = <span>{props.message}</span>
  }

  if (props.tip !== undefined && props.valid && props.touched) {
    tipMessage = <span className="input-tip">{props.tip}</span>
  }

  switch (props.inputType) {
    case ('input'):
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
      {tipMessage}
    </div>
  );
}

export default CheckoutInput;