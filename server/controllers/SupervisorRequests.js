const StudentGroups = require("../models/StudentGroups");
const User = require("../models/User");
var mongoose = require("mongoose");

//@desc get all topic requests
//@route GET /api/v1/topicRequests/:supId
exports.getTopicRequests = async (req, res) => {
  try {
    const supervisor = mongoose.Types.ObjectId(req.params.supId);
    const studentGroups = await StudentGroups.find({
      supervisor,
      supervisorStatus: "pending",
    }).populate("student1 student2 student3 student4 supervisor cosupervisor");
    res.status(200).json({ success: true, data: studentGroups });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc accept topic request
//@route POST /api/v1/topicRequests/:stdGrpID
exports.acceptOrRejectTopicRequest = async (req, res) => {
  try {
    const studentGroup = await mongoose.Types.ObjectId(req.params.stdGrpID);
    const supervisorStatus = await req.body.action;
    const updatedGroup = await StudentGroups.findByIdAndUpdate(studentGroup, {
      supervisorStatus,
    });
    res.status(200).json({ success: true, data: updatedGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
