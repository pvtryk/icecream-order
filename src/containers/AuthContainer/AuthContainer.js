import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import useInputChanged from '../../hooks/useInputChanged';

import InputField from '../../components/UI/InputField/InputField';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import { showErrorMessage } from '../../shared/utility';
import './AuthContainer.scss';
import appLogo from "../../assets/images/example-logo.png";

// TODO: REMOVE INPUT VALIDATION ON LOGIN FORM
const AuthContainer = props => {

  const authInitialState = {
    email: {
      elementType: 'email',
      labelEl: 'E-mail',
      additionalClass: '',
      config: {
        type: 'email',
        name: 'email'
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
        name: 'password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    }
  }

  const [authForm, setAuthForm] = useState(authInitialState);
  const [isSignIn, setIsSignIn] = useState(true);

  const { formIsValid, inputChangedHandler } = useInputChanged();

  const switchFormType = (event) => {
    event.preventDefault();
    setIsSignIn(!isSignIn);

  }
  const inputHandler = (event, inputId) => {
    const newValue = inputChangedHandler(authForm, event, inputId);

    setAuthForm(newValue);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignIn
    );
  };

  let formType = isSignIn ? 'Log in' : 'Sign Up';
  let formElements = [];
  let errorMessage = null;
  let redirectAfterAuth;

  for (const key in authForm) {
    formElements.push({
      id: key,
      options: authForm[key],
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
      changed={(event) => inputHandler(event, input.id)}
    />
  ));

  if (props.loading) {
    form = <Loader />
  }

  if (props.error) {
    errorMessage = showErrorMessage(props.error.message);
  }

  if (props.isAuth) {
    redirectAfterAuth = <Redirect to="/" />
  }

  return (
    <div className="auth">
      {redirectAfterAuth}

      <div className="auth__header">
        <img src={appLogo} alt="logo" />
      </div>

      <div className="auth__inner">
        <h1 className="auth__title">{formType}</h1>
        {errorMessage && <p className="auth__message">{errorMessage}</p>}
        <form className="auth__form" onSubmit={formSubmitHandler}>
          {form}
          { !props.loading && <Button name="Submit!" disabled={!formIsValid} /> }
        </form>
      </div>

      <div className="auth__footer">
        <span className="auth__switch" onClick={switchFormType}>
          Go to
          {isSignIn ? ' Register' : ' Log In'}
        </span>
      </div>
    </div>
  );
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