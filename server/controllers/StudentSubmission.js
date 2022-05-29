const StudentGroups = require("../models/StudentGroups");
const User = require("../models/User");
var mongoose = require("mongoose");
const StudentSubmission = require("../models/StudentSubmission");

//@desc create new submissoin
//@route POST /api/v1/studentSubmission
exports.createStudentSubmission = async (req, res) => {
  try {
    await StudentSubmission.create(req.body);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
