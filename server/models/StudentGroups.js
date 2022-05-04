const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentGroups = new Schema({
  student1: {
    type: String,
    require: true,
  },
  student2: {
    type: String,
  },
  student3: {
    type: String,
  },
  student4: {
    type: String,
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
    type: String,
  },
  cosupervisor: {
    type: String,
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
