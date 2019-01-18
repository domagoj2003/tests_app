const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SestiSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  questionset: [
    {
      section: {
        type: String,
        required: true
      },
      sort: {
        type: String,
        required: true
      },
      question: {
        type: String,
        required: true
      },
      correctanswer: {
        type: String,
        required: true
      },
      options: {
        type: String
      },
      help: {
        type: String
      },
      info: {
        type: String
      }
    }
  ]
});

module.exports = Sesti = mongoose.model("sesti", SestiSchema);
