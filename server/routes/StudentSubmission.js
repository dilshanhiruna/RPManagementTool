const express = require("express");
const router = express.Router();

const {
  createStudentSubmission,
  getSpecificStudentSubmission,
} = require("../controllers/StudentSubmission");

router.post("/", createStudentSubmission);
router.post("/getSpecific", getSpecificStudentSubmission);

module.exports = router;
