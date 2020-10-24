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
      },
      secondName: {
        elementType: 'input',
        labelEl: 'Second name',
        config: {
          type: 'text',
        },
        additionalClass: 'half',
        value: '',
      },
      email: {
        elementType: 'email',
        labelEl: 'Email',
        config: {
          type: 'email',
        },
        additionalClass: '',
        value: '',
      },
    },
  };
  
  // componentDidMount() {}

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedForm[inputId]
    }
    updatedFormElement.value = event.target.value;
    updatedForm[inputId] = updatedFormElement;

    this.setState({orderForm: updatedForm});
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('[form] submitted!');
    let formData = {};
    
    for (const formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const order = {
      formData: formData,
      price: this.props.price
    }
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
        this.props.history.push('/thank-you');
      })
      .catch(error => {
        console.log(error);
      })
  }

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
        <form className="checkout-container__form" onSubmit={this.formSubmitHandler}>
          {formElements.map((input) => (
            <CheckoutInput
              key={input.id}
              inputType={input.options.elementType}
              labelEl={input.options.labelEl}
              elementConfig={input.options.config}
              additionalClass={input.options.additionalClass}
              value={input.options.value}
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