const Validator = require("validator");
const isEmpty = require("./is-empty");
// const isDecimal = (n) => {
//   if (n == "")
//     return false;

//   let strCheck = "0123456789";
//   let i;

//   for (i in n) {
//     if (strCheck.indexOf(n[i]) == -1)
//       return false;
//   }
//   return true;
// }
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.pin = !isEmpty(data.pin) ? data.pin : "";
  data.pin2 = !isEmpty(data.pin2) ? data.pin2 : "";
  // data.password = !isEmpty(data.password) ? data.password : '';
  // data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (
    !Validator.isLength(data.mobile, {
      min: 10,
      max: 10
    })
  ) {
    errors.mobile = "Mobile no must be 10 digits";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }
  if (!Validator.isNumeric(data.mobile)) {
    errors.mobile = "Mobile no is invalid";
  }

  if (Validator.isEmpty(data.pin)) {
    errors.pin = "Pin field is required";
  }

  if (
    !Validator.isLength(data.pin, {
      min: 4,
      max: 30
    })
  ) {
    errors.pin = "Pin must be at least 4 characters";
  }
  if (!Validator.isNumeric(data.pin)) {
    errors.pin = "Pin is invalid";
  }
  if (Validator.isEmpty(data.pin2)) {
    errors.pin2 = "Pin field is required";
  }

  if (
    !Validator.isLength(data.pin2, {
      min: 4,
      max: 30
    })
  ) {
    errors.pin2 = "Pin must be at least 4 characters";
  }
  if (!Validator.isNumeric(data.pin)) {
    errors.pin2 = "Pin is invalid";
  }

  if (Validator.isEmpty(data.pin2)) {
    errors.pin2 = "pin field is required";
  }

  if (
    !Validator.isLength(data.pin2, {
      min: 4,
      max: 30
    })
  ) {
    errors.pin2 = "pin must be at least 4 characters";
  }
  if (!Validator.isNumeric(data.pin2)) {
    errors.pin2 = "pin is invalid";
  }
  if (!Validator.equals(data.pin, data.pin2)) {
    errors.pin2 = "Passwords must match";
  }
  // if (!isDecimal(data.pin)) {
  //   errors.pin = 'Pin must be number ' + data.pin;
  // }
  // if (Validator.isEmpty(data.password2)) {
  //   errors.password2 = 'Confirm Password field is required';
  // }

  // if (!Validator.equals(data.password, data.password2)) {
  //   errors.password2 = 'Passwords must match';
  // }

  //last line
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
