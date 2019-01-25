const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateSubjectInput(data) {
  const errors = {};

  data.subject = !isEmpty(data.subject) ? data.subject : "";

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Naziv predmeta je obvezan podatak";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
