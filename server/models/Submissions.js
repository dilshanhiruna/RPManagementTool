const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Submissions = new Schema({
  submissionName: {
    type: String,
    require: true,
  },
  sType: {
    type: String,
  },
  sTemplate: {
    type: String,
  },
  sMarkingScheme: {
    type: String,
  },
  sDeadline: {
    type: String,
  },
  sVisibility: {
    type: Boolean,
  },
});
const submission = mongoose.model("Submissions", Submissions);
module.exports = submission;
