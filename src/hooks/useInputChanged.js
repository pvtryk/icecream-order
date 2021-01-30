import {useState} from "react";
import {checkValidity} from "../shared/utility";

const useInputChanged = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (data, element, inputId) => {
    const updatedForm = {
      ...data
    };
    const updatedFormElement = {
      ...updatedForm[inputId],
    };

    updatedFormElement.value = element.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputId] = updatedFormElement;

    // check if form is valid
    let formValidity = true;

    for (const inputId in updatedForm) {
      formValidity = updatedForm[inputId].valid && formValidity;
    }

    setFormIsValid(formValidity);
    console.log('cos sie dzieje', updatedForm);

    return updatedForm;

    // this.setState({ authForm: updatedForm, formIsValid: formIsValid });
  }
  console.log('here i am');

  return {
    formIsValid: formIsValid,
    inputChangedHandler: inputChangedHandler
  }
};

export default useInputChanged;
