const StudentGroups = require('../models/StudentGroups');
const User = require('../models/User');
var mongoose = require('mongoose');

//@desc get all topic requests
//@route GET /api/v1/studentgroups
exports.getTopicRequests = async (req, res) => {
  try {
    const supervisor = mongoose.Types.ObjectId(req.params.supId);
    const studentGroups = await StudentGroups.find({
      supervisor,
      supervisorStatus: 'pending',
    }).populate('student1 student2 student3 student4 supervisor cosupervisor');
    res.status(200).json({ success: true, data: studentGroups });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
