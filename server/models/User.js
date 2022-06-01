const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

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

//Return jsonwebtoken for the specified user
User.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, staffType: this.staffType },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "60d",
    }
  );
  return token;
};

const user = mongoose.model("User", User);

module.exports = user;
