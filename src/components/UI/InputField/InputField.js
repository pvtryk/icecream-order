import React from 'react';
import './InputField.scss';

const InputField = (props) => {
  const { additionalClass, valid, touched, tip, message, inputType, elementConfig, value, changed, labelEl } = props;
  let inputEl = null;
  let errorMessage;
  let tipMessage;
  const inputClasses = ['input-field'];

  if (additionalClass) {
    inputClasses.push(additionalClass);
  }

  if (valid && touched) {
    inputClasses.push('invalid');
    errorMessage = <span>{message}</span>;
  }

  if (tip !== undefined && valid && touched) {
    tipMessage = <span className="input-tip">{tip}</span>;
  }

  switch (inputType) {
    case 'input':
      inputEl = (
        <input
          className="input-field__input"
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
    break;
    
    case 'email':
      inputEl = (
        <input
          className="input-field__input"
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
    break;
    
    case 'password':
      inputEl = (
        <input
          className="input-field__input"
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
    break;
    
    case 'textarea':
      inputEl = <textarea {...elementConfig} />;
    break;
    
    default:
    break;
  }

  return (
    <div className={inputClasses.join(' ')} >
      <label className="input-field__label">{labelEl}</label>
      {inputEl}
      {errorMessage}
      {tipMessage}
    </div>
  );
};

export default InputField;
