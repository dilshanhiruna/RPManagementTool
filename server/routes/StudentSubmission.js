const express = require("express");
const router = express.Router();

const { createStudentSubmission } = require("../controllers/StudentSubmission");

router.post("/", createStudentSubmission);

module.exports = router;
