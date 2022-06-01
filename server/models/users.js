const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    type:{
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
		name: Joi.string().required().label("Full Name"),
        type: Joi.string().required().label("Type"),
        role: Joi.string().required().label("Role"),
        interestedResearchField: Joi.string().required().label("Interested Research Field"),
        studentGrouped: Joi.string().required().label("Student Grouped"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };