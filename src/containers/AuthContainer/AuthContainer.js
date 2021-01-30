import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

import InputField from '../../components/UI/InputField/InputField';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import { checkValidity } from '../../shared/utility';
import './AuthContainer.scss';

// TODO: REMOVE INPUT VALIDATION ON LOGIN FORM
class AuthContainer extends Component {
  state = {
    authForm: {
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
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'password',
        labelEl: 'Password',
        additionalClass: '',
        config: {
          type: 'password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loader: false,
    isSignIn: true,
  };

  switchFormType = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        isSignIn: !prevState.isSignIn
      }
    })

  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.authForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputId],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
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

    this.setState({ authForm: updatedForm, formIsValid: formIsValid });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignIn
    );
  };

  render() {
    let formType = this.state.isSignIn ? 'Log in' : 'Sign Up';
    let formElements = [];
    let errorMessage = null;
    let redirectAfterAuth;

    for (const key in this.state.authForm) {
      formElements.push({
        id: key,
        options: this.state.authForm[key],
      });
    }

    let form = formElements.map((input) => (
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
    ));

    if (this.props.loading) {
      form = <Loader />
    }

    if (this.props.error) {
      errorMessage = this.props.error.message
    }

    if (this.props.isAuth) {
      redirectAfterAuth = <Redirect to="/" />
    }

    return (
      <div className="auth">
        {redirectAfterAuth}
        <div className="auth__inner">
          <h1 className="auth__title">{formType}</h1>
          {errorMessage && <p className="auth__message">{errorMessage}</p>}
          <form className="auth__form" onSubmit={this.formSubmitHandler}>
            {form}
            <Button name="Submit!" />
          </form>
          <div className="auth__button-wrap">
            <span className="auth__button" onClick={this.switchFormType}>
              Go to
              {this.state.isSignIn ? ' Register' : ' Log In'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    loading: props.auth.loading,
    error: props.auth.error,
    isAuth: props.auth.token !== null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, type) => dispatch(action.auth(email, pass, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);