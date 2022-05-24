const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentGroups = new Schema({
  student1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  student2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  student3: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  student4: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  groupClosed: {
    type: String,
  },
  researchTopic: {
    type: String,
  },
  topicFeedback: {
    type: Number,
  },
  topicDetailDocument: {
    type: Number,
  },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  supervisorStatus: {
    type: String,
  },
  cosupervisorStatus: {
    type: String,
  },
  cosupervisor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  panelmember: {
    type: String,
  },
  createdDate: {
    type: Date,
    require: true,
  },
});
const studentGroups = mongoose.model("StudentGroups", StudentGroups);

module.exports = studentGroups;
