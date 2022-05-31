const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSubmissionSchema = new Schema({
  file: {
    type: Object,
    require: true,
  },
  submissionDetailsId: {
    type: Schema.Types.ObjectId,
  },
  obtainedMarks: {
    type: Number,
  },
  studentGroupId: {
    type: Schema.Types.ObjectId,
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
});
const StudentSubmission = mongoose.model(
  "StudentSubmission",
  StudentSubmissionSchema
);
module.exports = StudentSubmission;
