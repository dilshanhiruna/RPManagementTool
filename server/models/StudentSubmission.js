const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSubmissionSchema = new Schema({
  file: {
    type: Object,
    require: true,
  },
  submissionDetailsId: {
    type: Schema.Types.ObjectId,
    ref: "SubmissionDetails",
  },
  obtainedMarks: {
    type: Number,
    default: null,
  },
  studentGroupId: {
    type: Schema.Types.ObjectId,
    ref: "StudentGroups",
  },
  supervisor: {
    type: Schema.Types.ObjectId,
  },
  cosupervisor: {
    type: Schema.Types.ObjectId,
  },
  panelmember: {
    type: Schema.Types.ObjectId,
  },
  submittedOn: {
    type: Date,
    default: new Date(),
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
});
const StudentSubmission = mongoose.model(
  "StudentSubmission",
  StudentSubmissionSchema
);
module.exports = StudentSubmission;
