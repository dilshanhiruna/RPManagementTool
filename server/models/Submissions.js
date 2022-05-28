const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubmissionDetails = new Schema({
  submissionName: {
    type: String,
    require: true,
  },
  sType: {
    type: String,
  },
  sDescription: {
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
const submission = mongoose.model("SubmissionDetails", SubmissionDetails);
module.exports = submission;
