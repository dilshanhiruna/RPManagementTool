const SubmissionDetails = require("../models/Submissions");

//@desc   Create new submission
//@route  POST /api/v1/AssignmentSubmissions
//@access Public
exports.createSubmission = async (req, res) => {
  const {
    submissionName, //category
    sType, //doc or presentation
    sDescription,
    sTemplate,
    sMarkingScheme,
    sDeadline,
    sVisibility,
  } = req.body;
  try {
    const submission = await SubmissionDetails.create({
      submissionName,
      sType,
      sDescription,
      sTemplate,
      sMarkingScheme,
      sDeadline,
      sVisibility,
    });

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc   View all submissions
//@route  GET /api/v1/AssignmentSubmissions/
//@access Public
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await SubmissionDetails.find();
    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc   Get one submission details
//@route  GET /api/v1/submission/:id
//@access Public
exports.getaSubmission = async (req, res) => {
  try {
    const submission = await SubmissionDetails.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "submission not exists",
      });
    }
    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "submission not found",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc Update a submission
//@route PUT /api/v1/submission/:id
//@access private
exports.updateSubmission = async (req, res, next) => {
  try {
    const submission = await SubmissionDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        msg: "Could not find a submission with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc Update a visibility
//@route PUT /api/v1/submission/:id
//@access private
exports.updateVisibility = async (req, res, next) => {
  try {
    const submission = await SubmissionDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        msg: "Could not find a submission with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
//@desc Delete a submission
//@route DELETE /api/v1/submission/:id
//@access private
exports.deleteSubmission = async (req, res, next) => {
  try {
    const submission = await SubmissionDetails.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        msg: "Could not find a submission with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc get active submissions
//@route GET /api/v1/AssignmentSubmissions/active
//@access private
exports.getActiveSubmissions = async (req, res) => {
  try {
    const submissions = await SubmissionDetails.find({ sVisibility: true });
    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
