const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Unesi korisničko ime";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Unesi točnu zaporku";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
