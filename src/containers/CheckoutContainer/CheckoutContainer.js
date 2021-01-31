import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useInputChanged from '../../hooks/useInputChanged';
import Button from '../../components/UI/Button/Button';
import InputField from '../../components/UI/InputField/InputField';

// TODO: CHANGE ACTION TO ACTIONS FOR EVERY ACTIONS IMPORT
import * as action from '../../store/actions/index';

import './CheckoutContainer.scss';

// TODO in v2:
// 1. Add adddress input with hints based on google maps & openstreet maps
// 2. CHECKBOX FOR ACCEPTANCE

const CheckoutContainer = props => {
  const checkoutInitialState = {
    firstName: {
      elementType: 'input',
      labelEl: 'First name',
      additionalClass: '',
      config: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true,
        message: 'Enter first name.',
      },
      valid: false,
      touched: false,
    },
    secondName: {
      elementType: 'input',
      labelEl: 'Second name',
      additionalClass: '',
      config: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true,
        message: 'Enter second name.',
      },
      valid: false,
      touched: false,
    },
    phoneNumber: {
      elementType: 'input',
      labelEl: 'Phone number',
      additionalClass: '',
      config: {
        type: 'tel',
      },
      value: '',
      validation: {
        required: true,
        regex: 'tel',
        message: 'Enter correct phone number.',
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'email',
      labelEl: 'E-mail',
      additionalClass: '',
      config: {
        type: 'email',
      },
      value: '',
      validation: {
        required: true,
        regex: 'email',
        message: 'Enter correct e-mail address.',
      },
      valid: false,
      touched: false,
    },
    address: {
      elementType: 'input',
      labelEl: 'Shipping address',
      additionalClass: '',
      config: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true,
        message: 'Enter shipping address.',
      },
      valid: false,
      touched: false,
    },
    city: {
      elementType: 'input',
      labelEl: 'City',
      additionalClass: '',
      config: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true,
        message: 'Enter city.',
      },
      valid: false,
      touched: false,
    },
    postal: {
      elementType: 'input',
      labelEl: 'Postal code',
      additionalClass: '',
      config: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true,
        regex: 'postal',
        maxLength: 6,
        message: 'Enter postal code.',
        tip: 'Example: 01-000'
      },
      valid: false,
      touched: false,
    },
  }

  const [checkoutForm, setCheckoutForm] = useState(checkoutInitialState);
  const [errorWithPost, setErrorWithPost] = useState(null);
  const { formIsValid, inputChangedHandler } = useInputChanged();

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

    if ( Object.getOwnPropertyNames(props.cart).length === 0 || props.token === null) {
      props.history.push('/');
    }
  }, [props.cart, props.token, props.history]);

  useEffect(() => {
    if (formIsValid && props.postError !== null) {
      setErrorWithPost(<p className="checkout-container__error">Ouch! Something went wrong</p>);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [formIsValid, props.postError]);

  const inputHandler = (event, inputId) => {
    const newVal = inputChangedHandler(checkoutForm, event, inputId);

    setCheckoutForm(newVal);
  }

  const checkValidityOnSubmit = () => {
    const inputs = {
      ...checkoutForm
    }

    for (const single in inputs) {
      const selected = inputs[single];
      
      if (selected.validation.required && !selected.touched) {
        selected.touched = true;
      }

      inputs[single] = selected;
    }

    setCheckoutForm(inputs);
  }

  // TODO: ADD REDUX ACTION FOR POST DATA
  const formSubmitHandler = (event) => {
    event.preventDefault();

    checkValidityOnSubmit();

    const token = props.token;
    let formData = {};

    for (const formEl in checkoutForm) {
      formData[formEl] = checkoutForm[formEl].value;
    }

    const order = {
      formData: formData,
      cart: props.cart,
      price: props.price,
      date: new Date(),
      userId: props.userId,
    };

    if (formIsValid) {
      props.onOrderPost(order, token);
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const formElements = [];
  for (const key in checkoutForm) {
    formElements.push({
      id: key,
      options: checkoutForm[key],
    });
  }

  return (
    <div className="checkout-container">
      { errorWithPost }

      <form
        className="checkout-container__form"
        onSubmit={formSubmitHandler}
      >

        {formElements.map((input) => (
          <InputField
            key={input.id}
            inputType={input.options.elementType}
            labelEl={input.options.labelEl}
            elementConfig={input.options.config}
            additionalClass={input.options.additionalClass}
            value={input.options.value}
            valid={!input.options.valid}
            touched={input.options.touched}
            message={input.options.validation.message}
            tip={input.options.validation.tip}
            changed={(event) => inputHandler(event, input.id)}
          />
        ))}
        <Button name="Order Now!" />
      </form>
    </div>
  );
}

const mapStateToProps = props => {
  return {
    // icecreams: props.ic.icecreams,
    cart: props.ic.cart,
    price: props.ic.totalPrice,
    token: props.auth.token,
    userId: props.auth.userId,
    postError: props.order.postError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderPost: (order, token) =>
      dispatch(action.orderPost(order, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutContainer));