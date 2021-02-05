import React from 'react';
import './InputField.scss';

const InputField = (props) => {
  let inputEl = null;
  let errorMessage;
  let tipMessage;
  const inputClasses = ['input-field'];

  if (props.additionalClass) {
    inputClasses.push(props.additionalClass);
  }

  if (props.valid && props.touched) {
    inputClasses.push('invalid');
    errorMessage = <span>{props.message}</span>;
  }

  if (props.tip !== undefined && props.valid && props.touched) {
    tipMessage = <span className="input-tip">{props.tip}</span>;
  }

  switch (props.inputType) {
    case 'input':
      inputEl = (
        <input
          className="input-field__input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
    break;
    
    case 'email':
      inputEl = (
        <input
          className="input-field__input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
    break;
    
    case 'password':
      inputEl = (
        <input
          className="input-field__input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
    break;
    
    case 'textarea':
      inputEl = <textarea {...props.elementConfig} />;
    break;
    
    default:
    break;
  }

  return (
    <div className={inputClasses.join(' ')} >
      <label className="input-field__label">{props.labelEl}</label>
      {inputEl}
      {errorMessage}
      {tipMessage}
    </div>
  );
};

export default InputField;
