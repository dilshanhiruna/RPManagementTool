const router = require("express").Router();
const { User } = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/userlogin", async (req, res) => {
	try {
		//Validate data
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		//Check whether the user with the given email exists
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Password or Email" });

		//Check whether the given password is valid
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password or Email" });

		//Return jsonwebtoken
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Successfully Logged In" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//Validate details
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

//Export the router
module.exports = router;