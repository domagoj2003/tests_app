const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  results: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      grade: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      section: {
        type: String,
        required: true
      },
      maxPoints: {
        type: Number,
        required: true
      },
      points: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Results = mongoose.model("results", ResultsSchema);
