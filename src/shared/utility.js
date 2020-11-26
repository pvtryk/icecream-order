export const checkValidity = (value, rules) => {
    let isValid = true;
    const postalRegex = /\d{2}-\d{3}/g;
    // const telRegex = /(?:<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/g;
    const telRegex = /(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/g;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.regex === 'postal') {
      isValid = value.match(postalRegex) && isValid;
    }
    
    if (rules.regex === 'tel') {
      value.replace(/\s/g, '');
      // isValid = telRegex.test(String(value)) && isValid;
      isValid = value.match(telRegex) && isValid;
    }
    
    if (rules.regex === 'email') {
      isValid = emailRegex.test(String(value).toLowerCase());
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length === rules.maxLength && isValid;
    }

    return isValid;
  }