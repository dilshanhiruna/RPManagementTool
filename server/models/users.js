const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({

    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    staffType:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    interestedResearchField:{
        type:String,
        required:true
    },
    studentGrouped:{
        type:String,
        required:true
    },
    studentGroupID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

//Return jsonwebtoken for the specified user
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, role:this.role }, process.env.JWTPRIVATEKEY, {
		expiresIn: "60d",
	});
	return token;
};

//Create user model
const User = mongoose.model("user", userSchema);

//Validate details
const validate = (data) => {
	const schema = Joi.object({
        uid: Joi.string().required().label("UID"),
		name: Joi.string().required().label("Full Name"),
        staffType: Joi.string().required().label("Staff Type"),
        role: Joi.string().required().label("Role"),
        interestedResearchField: Joi.string().required().label("Interested Research Field"),
        studentGrouped: Joi.string().required().label("Student Grouped"),
        studentGroupID: Joi.string().required().label("Student Group ID"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };