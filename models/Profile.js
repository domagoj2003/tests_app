const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  school: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  results: [
    {
      subject: {
        type: String,
        required: true
      },
      section: {
        type: String,
        required: true
      },
      maxpoints: {
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
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
