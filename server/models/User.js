const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  uid: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
  },
  interestedResearchField: {
    type: String,
  },
  staffType: {
    type: String,
  },
  studentGrouped: {
    type: Boolean,
  },
  studentGroupID: {
    type: String,
  },
});
const user = mongoose.model("User", User);

module.exports = user;
