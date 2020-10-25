import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios-orders';
import CheckoutInput from '../../components/Checkout/CheckoutInput/CheckoutInput';
import Button from '../../components/UI/Button/Button';

import './CheckoutContainer.scss';

// TODO:
// 1.validation
// 2. Add adddress input with hints based on google maps & openstreet maps

class CheckoutContainer extends Component {
  state = {
    orderForm: {
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
          message: 'Enter your first name.',
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
          message: 'Enter your second name.',
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
          message: 'Enter your correct phone number.',
        },
        value: '',
        validation: {
          required: true,
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
          message: 'Enter your correct e-mail address.',
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
          message: 'Enter your shipping address.',
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
          message: 'Enter your city.',
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
          message: 'Enter your postal code.',
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loader: false
  };

  // componentDidMount() {}

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputId],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputId] = updatedFormElement;

    // check if form is valid
    let formIsValid = true;
    for (const inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('[form] submitted!');
    let formData = {};

    for (const formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const order = {
      formData: formData,
      price: this.props.price,
    };
    axios
      .post('/orders.json', order)
      .then((res) => {
        console.log(res);
        this.props.history.push('/thank-you');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const formElements = [];
    for (const key in this.state.orderForm) {
      formElements.push({
        id: key,
        options: this.state.orderForm[key],
      });
    }

    return (
      <div className="checkout-container">
        <form
          className="checkout-container__form"
          onSubmit={this.formSubmitHandler}
        >
          {formElements.map((input) => (
            <CheckoutInput
              key={input.id}
              inputType={input.options.elementType}
              labelEl={input.options.labelEl}
              elementConfig={input.options.config}
              additionalClass={input.options.additionalClass}
              value={input.options.value}
              valid={!input.options.valid}
              touched={input.options.touched}
              message={input.options.validation.message}
              changed={(event) => this.inputChangedHandler(event, input.id)}
            />
          ))}

          <Button name="Order Now!" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = props => {
  return {
    icecreams: props.ic.icecreams,
    cart: props.ic.cart,
    price: props.ic.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(CheckoutContainer));