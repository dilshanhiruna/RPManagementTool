const User = require("../models/User");
const bcrypt = require("bcrypt");

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

//Register a new user
exports.signup = async (req, res) => {
  try {
		//Validate details
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });

		//Check whether the user with the given email already exists
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "This user is already exist" });

		//Hashing the password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const savedUser = await new User({ ...req.body, password: hashPassword }).save();
		const token = savedUser.generateAuthToken();
		
		res.status(201).send({ data:token,message: "User has successfully created" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
	}
}

//Get all users
exports.allusers = async (req, res) => {
  try {
    console.log("String");
  //   User.find().exec((err,users) => {
  //     if(err) {
  //         return res.status(400).json({
  //             error:err
  //         });
  //     }
  //     return res.status(200).json({
  //         success:true,
  //         existingUsers:users
  //     });
  // });
  const existingUsers = await User.find();
  return res.status(200).json({
            success:true,
            existingUsers
        });
  } catch (error) {
    console.error(error);
  } 
}

//Update user
exports.update = async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id, 
    {
        $set:req.body
    },
    (err, user) => {
        if(err) {
            return res.status(400).json({error:err});
        }
        return res.status(200).json({
            success:"Updated user successfully"
        });
    }
);
}

//Delete user
exports.deleteuser = async (req, res) => {
  User.findByIdAndRemove(req.params.id).exec((err, deletedUser) => {
    if(err) return res.status(400).json({
        message:"Deletion unsuccessful", err
    });
    return res.json({
        message:"Delete user successful", deletedUser
    });
});
}
