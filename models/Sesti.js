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
      type: {
        type: Number,
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
      help: {
        type: String,
        required: true
      },
      info: {
        type: String
      }
    }
  ]
});

module.exports = Sesti = mongoose.model("sesti", SestiSchema);
