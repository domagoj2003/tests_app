const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistryInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Ime mora sadržavati najmanje 2 i najviše 30 znakova";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Ime je obvezan podatak";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Navedi ispravnu e-mail adresu";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Zaporka je obvezno polje";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.passport = "Lozinka mora sadržavati najmanje 6 i najviše 20 znakova";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Ponovi lozinku";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Lozinke se ne podudaraju";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
