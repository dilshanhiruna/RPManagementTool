const StudentGroups = require("../models/StudentGroups");
const User = require("../models/User");
var mongoose = require("mongoose");
const StudentSubmission = require("../models/StudentSubmission");
const { find } = require("../models/StudentGroups");

//@desc create new submissoin
//@route POST /api/v1/studentSubmission
exports.createStudentSubmission = async (req, res) => {
  try {
    const submissionDetailsId = req.body.submissionDetailsId;
    const studentGroupId = req.body.studentGroupId;

    // //validation
    // const existingSubmission = await StudentSubmission.find({
    //   submissionDetailsId,
    //   studentGroupId,
    // });
    // if (existingSubmission) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "submission already exists" });
    // }
    await StudentSubmission.create(req.body);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

//@desc get submission of a given student group and given submission detail id
//@route POST /api/v1/studentSubmission/getSpecific
exports.getSpecificStudentSubmission = async (req, res) => {
  try {
    const submissionDetailsId = mongoose.Types.ObjectId(
      req.body.submissionDetailsId
    );
    const studentGroupId = mongoose.Types.ObjectId(req.body.studentGroupId);

    const existingSubmission = await StudentSubmission.findOne({
      submissionDetailsId,
      studentGroupId,
    });
    res.status(200).json({ success: true, data: existingSubmission });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
