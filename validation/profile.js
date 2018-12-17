const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateProfileInput(data) {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.grade = !isEmpty(data.grade) ? data.grade : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Unesi naziv škole koju pohađaš";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "Unesi grad";
  }
  if (Validator.isEmpty(data.grade)) {
    errors.grade = "Odaberi razred koji pohađaš";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
