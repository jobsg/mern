const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.pin = !isEmpty(data.pin) ? data.pin : '';

  if (!Validator.isLength(data.mobile, {
      min: 10,
      max: 10
    })) {
    errors.name = 'Mobile no must be 10 digits';
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.email = 'Mobile no field is required';
  }
  if (!Validator.isNumeric(data.mobile)) {
    errors.mobile = 'Mobile no is invalid';
  }
  if (Validator.isEmpty(data.pin)) {
    errors.password = 'Pin field is required';
  }
  if (!Validator.isNumeric(data.pin)) {
    errors.pin = 'Pin is invalid';
  }


  //last line
  return {
    errors,
    isValid: isEmpty(errors)
  };
};