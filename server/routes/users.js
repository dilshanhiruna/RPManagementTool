const express = require('express');
const { Users, User, validate } = require('../models/users');
const bcrypt = require("bcrypt");

//To send requests
const router = express.Router();

//Save users
// router.post('/user/save', (req, res) => {
//     let newUser = new Users(req.body);

//     newUser.save((err) => {
//         if(err) {
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:"Users saved successfully"
//         });
//     });
// });





router.post("/usersignup", async (req, res) => {
	try {
		//Validate details
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

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
	}
});





//Get users
router.get('/users', (req, res) => {
    User.find().exec((err,users) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingUsers:users
        });
    });
});


//To get a specific user
router.get("/user/:id", (req, res) => {
    let userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err) {
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success: true,
            user
        });
    });
});


//Update users
router.put('/user/update/:id', (req, res) => {
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
});


//Delete user
router.delete('/user/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).exec((err, deletedUser) => {
        if(err) return res.status(400).json({
            message:"Deletion unsuccessful", err
        });
        return res.json({
            message:"Delete user successful", deletedUser
        });
    });
});


module.exports = router;