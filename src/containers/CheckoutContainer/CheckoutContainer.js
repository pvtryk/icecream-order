import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import InputField from '../../components/UI/InputField/InputField';
import { checkValidity } from '../../shared/utility';

// TODO: CHANGE ACTION TO ACTIONS FOR EVERY ACTIONS IMPORT
import * as action from '../../store/actions/index';

import './CheckoutContainer.scss';

// TODO:
// 1. Add adddress input with hints based on google maps & openstreet maps
// 2. CHECKBOX FOR ACCEPTANCE

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
    },
    formIsValid: false,
    loader: false,
  };
  
  componentDidMount() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' }); 
    
    if ( Object.getOwnPropertyNames(this.props.cart).length === 0 || this.props.token === null) {
      this.props.history.push('/');
    }
  }


  checkValidityOnSubmit() {
    const inputs = {
      ...this.state.orderForm
    }

    for (const single in inputs) {
      const selected = inputs[single];
      
      if (selected.validation.required && !selected.touched) {
        selected.touched = true;
      }

      inputs[single] = selected;
    }
    this.setState({orderForm: inputs});
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputId],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputId] = updatedFormElement;

    // check if form is valid
    let formIsValid = true;
    for (const inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  // TODO: ADD REDUX ACTION FOR POST DATA
  formSubmitHandler = (event) => {
    event.preventDefault();
    this.checkValidityOnSubmit();
    let formData = {};

    for (const formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }

    const token = this.props.token;
    const order = {
      formData: formData,
      cart: this.props.cart,
      price: this.props.price,
      date: new Date(),
      userId: this.props.userId,
    };

    // TODO: FIX PUSH TO THANK YOU PAGE IF POST NOT SEND
    if (this.state.formIsValid) {
      this.props.onOrderPost(order, token);
      this.props.history.push('/thank-you');
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' }); 
    }
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
    price: props.ic.totalPrice,
    token: props.auth.token,
    userId: props.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderPost: (order, token) =>
      dispatch(action.orderPost(order, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutContainer));