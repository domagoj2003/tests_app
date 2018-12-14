const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateQuestionsInput(data) {
  const errors = {};

  data.section = !isEmpty(data.section) ? data.section : "";
  data.question = !isEmpty(data.question) ? data.question : "";
  data.correctanswer = !isEmpty(data.correctanswer) ? data.correctanswer : "";

  if (Validator.isEmpty(data.section)) {
    errors.section = "Cjelina je obvezan podatak";
  }
  if (!Validator.isLength(data.section, { min: 4 })) {
    errors.section = "Naziv je prekratak";
  }
  if (Validator.isEmpty(data.correctanswer)) {
    errors.correctanswer = "Točan odgovor je obvezan podatak";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
