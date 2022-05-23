const StudentGroups = require("../models/StudentGroups");
const User = require("../models/User");

//@desc create a student group
//@route POST /api/v1/studentgroups
exports.createGroup = async (req, res) => {
  //get data from body
  const { student1, student2, student3, student4 } = req.body;

  //create new student group
  const newStudentGroup = new StudentGroups({
    student1,
    student2: student2 || null,
    student3: student3 || null,
    student4: student4 || null,
    groupClosed: null,
    researchTopic: null,
    topicFeedback: null,
    topicDetailDocument: null,
    supervisor: null,
    cosupervisor: null,
    panelmember: null,
    createdDate: new Date(),
  });
  //make studentGrouped true for students in group
  try {
    await User.findByIdAndUpdate(student1, {
      studentGrouped: true,
    });
    if (student2) {
      await User.findByIdAndUpdate(student2, {
        studentGrouped: true,
      });
    }
    if (student3) {
      await User.findByIdAndUpdate(student3, {
        studentGrouped: true,
      });
    }
    if (student4) {
      await User.findByIdAndUpdate(student4, {
        studentGrouped: true,
      });
    }
  } catch (err) {
    console.log(err);
  }

  //insert group data into database
  try {
    const savedStudentGroup = await newStudentGroup.save();

    //add the group id to the students studentGroupID field
    await User.findByIdAndUpdate(student1, {
      studentGroupID: savedStudentGroup._id,
    });

    if (student2) {
      await User.findByIdAndUpdate(student2, {
        studentGroupID: savedStudentGroup._id,
      });
    }
    if (student3) {
      await User.findByIdAndUpdate(student3, {
        studentGroupID: savedStudentGroup._id,
      });
    }
    if (student4) {
      await User.findByIdAndUpdate(student4, {
        studentGroupID: savedStudentGroup._id,
      });
    }

    res.status(200).json({ success: true, data: savedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update students group
//@route PUT /api/v1/studentgroups/addstudents/:id
exports.updateStudentsInGroup = async (req, res) => {
  const { student } = req.body;
  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          students: student,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {}
};

//@desc close group
//@route PUT /api/v1/studentgroups/close/:id
exports.closeGroup = async (req, res) => {
  try {
    const closedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { groupClosed: true },
      { new: true }
    );
    res.status(200).json({ success: true, data: closedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update research topic
//@route PUT /api/v1/studentgroups/researchtopic/:id
exports.updateResearchTopic = async (req, res) => {
  const { researchTopic } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { researchTopic },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update supervisor
//@route PUT /api/v1/studentgroups/supervisor/:id
exports.updateSupervisor = async (req, res) => {
  const { supervisor } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { supervisor },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update cosupervisor
//@route PUT /api/v1/studentgroups/cosupervisor/:id
exports.updateCosupervisor = async (req, res) => {
  const { cosupervisor } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { cosupervisor },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update panelmember
//@route PUT /api/v1/studentgroups/panelmember/:id
exports.updatePanelmember = async (req, res) => {
  const { panelmember } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { panelmember },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update topic feedback
//@route PUT /api/v1/studentgroups/topicfeedback/:id
exports.updateTopicFeedback = async (req, res) => {
  const { topicFeedback } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { topicFeedback },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc update topic detail document
//@route PUT /api/v1/studentgroups/topicdetail/:id
exports.updateTopicDetailDocument = async (req, res) => {
  const { topicDetailDocument } = req.body;

  try {
    const updatedStudentGroup = await StudentGroups.findByIdAndUpdate(
      req.params.id,
      { topicDetailDocument },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStudentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc get all student groups
//@route GET /api/v1/studentgroups
exports.getAllStudentGroups = async (req, res) => {
  try {
    const studentGroups = await StudentGroups.find();
    res.status(200).json({ success: true, data: studentGroups });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc get student group by id
//@route GET /api/v1/studentgroups/:id
exports.getStudentGroupById = async (req, res) => {
  try {
    const studentGroup = await StudentGroups.findById(req.params.id).populate(
      "student1 student2 student3 student4"
    );

    res.status(200).json({ success: true, data: studentGroup });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc delete student group and there must be only student1 in the group to delete
//@route DELETE /api/v1/studentgroups/:id
exports.deleteStudentGroup = async (req, res) => {
  try {
    const studentGroup = await StudentGroups.findById(req.params.id);
    if (
      studentGroup.student2 ||
      studentGroup.student3 ||
      studentGroup.student4
    ) {
      return res.status(400).json({
        success: false,
        error: "You can't delete this group because it has more than 1 student",
      });
    }
    await StudentGroups.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc get all student who does not have a group
//@route GET /api/v1/studentgroups/addstudents
exports.getAllStudentsWithoutAGroup = async (req, res) => {
  try {
    const students = await Students.find({ studentGrouped: null });
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
