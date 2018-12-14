const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SixthgradeSchema = new Schema({
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
      }
    }
  ]
});

module.exports = Sixthgrade = mongoose.model("sixthgrade", SixthgradeSchema);
