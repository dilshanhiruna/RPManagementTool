const User = require("../models/User");

//@desc Get users by matching keyword in name or email
//@route GET /api/v1/users/
//@access Public
exports.getStudentsByKeyword = async (req, res) => {
  try {
    const { keyword } = req.params;
    const users = await User.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { uid: { $regex: keyword, $options: "i" } },
      ],
      role: "student",
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc Get user by id
//@route GET /api/v1/users/:id
//@access Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc Get all supervisors
//@route GET /api/v1/users/supervisors
//@access Public
exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ staffType: "supervisor" });

    return res.status(200).json({
      success: true,
      data: supervisors,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
