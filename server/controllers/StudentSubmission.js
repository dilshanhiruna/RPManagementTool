const StudentGroups = require("../models/StudentGroups");
const User = require("../models/User");
var mongoose = require("mongoose");
const StudentSubmission = require("../models/StudentSubmission");
const { find } = require("../models/StudentGroups");
const { getStudentGroupById } = require("./StudentGroups");

//@desc create new submissoin
//@route POST /api/v1/studentSubmission
exports.createStudentSubmission = async (req, res) => {
  try {
    const submitionObject = req.body;

    const submissionDetailsId = mongoose.Types.ObjectId(
      submitionObject.submissionDetailsId
    );
    const studentGroupId = mongoose.Types.ObjectId(
      submitionObject.studentGroupId
    );

    //validation
    const existingSubmission = await StudentSubmission.findOne({
      submissionDetailsId,
      studentGroupId,
    });
    if (existingSubmission) {
      return res
        .status(400)
        .json({ success: false, msg: "submission already exists" });
    }

    //find supervisor/co-supervisor and panel members of student groups
    const studentGroup = await StudentGroups.findById(studentGroupId);
    submitionObject.supervisor = studentGroup.supervisor;
    submitionObject.cosupervisor = studentGroup.cosupervisor;
    submitionObject.panelmember = studentGroup.panelmember;

    await StudentSubmission.create(submitionObject);

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

//@desc delete student submission
//@route DELETE /api/v1/studentSubmission/:id
exports.deleteStudentSubmission = async (req, res) => {
  try {
    const _id = req.params.id;

    const deleteStudentSubmission = await StudentSubmission.findByIdAndDelete(
      _id
    );
    res.status(200).json({ success: true, data: deleteStudentSubmission });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc get all submissions done by student groups of a specific staff member who is either the supervisor or cosuperfisor of the group
//@route GET /api/v1/studentSubmission/staff/:id
exports.getSubmissionOfSupervisor = async (req, res) => {
  try {
    const staffId = req.params.id;
    const studentSubmissions = await StudentSubmission.find({
      $or: [{ supervisor: staffId }, { cosupervisor: staffId }],
    })
      .populate({
        path: "submissionDetailsId",
        match: { sType: { $eq: "Document" } },
      })
      .populate("studentGroupId");
    res.status(200).json({ success: true, data: studentSubmissions });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err });
  }
};

//@desc get all submissions done by student groups of a specific panel member
//@route GET /api/v1/studentSubmission/panel/:id
exports.getSubmissionsOfPanelMember = async (req, res) => {
  try {
    const panelmember = req.params.id;
    const studentSubmissions = await StudentSubmission.find({
      panelmember,
    })
      .populate({
        path: "submissionDetailsId",
        match: { sType: { $eq: "Presentation" } },
      })
      .populate("studentGroupId");
    res.status(200).json({ success: true, data: studentSubmissions });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update obtainedmarks filed (CAN BE USED TO BOTH ADD AND UPDATE MARKS FUNCTIONS)
//@route put /api/v1/studentSubmission/addMarks/:id
exports.addMarks = async (req, res) => {
  try {
    const _id = req.params.id;
    const obtainedMarks = req.body.marks;
    console.log(obtainedMarks);

    const newStudentSubmission = await StudentSubmission.findByIdAndUpdate(
      _id,
      {
        obtainedMarks,
      }
    );
    res.status(200).json({ success: true, data: newStudentSubmission });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
