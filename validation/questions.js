const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateQuestionsInput(data) {
  const errors = {};

  data.section = !isEmpty(data.section) ? data.section : "";
  data.sort = !isEmpty(data.sort) ? data.sort : "";
  data.question = !isEmpty(data.question) ? data.question : "";
  data.correctanswer = !isEmpty(data.correctanswer) ? data.correctanswer : "";
  data.options = data.sort === "A" ? "" : data.options;

  if (Validator.isEmpty(data.section)) {
    errors.section = "Cjelina je obvezan podatak";
  }
  if (!Validator.isLength(data.section, { min: 4 })) {
    errors.section = "Naziv je prekratak";
  }
  if (Validator.isEmpty(data.sort)) {
    errors.sort = "Tip pitanja je obvezan podatak";
  }
  if (Validator.isEmpty(data.question)) {
    errors.question = "Pitanje je obvezno polje";
  }
  if (Validator.isEmpty(data.correctanswer)) {
    errors.correctanswer = "Točan odgovor je obvezan podatak";
  }
  if (data.sort === "B") {
    let optionsArr = new Array();
    optionsArr = data.options.split(",").filter(option => option != false)
      .length;
    if (optionsArr < 3) {
      errors.options = "Navedi minimalno tri opcijska odgovora";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
