const express = require("express");
const router = express.Router();

const {
  createStudentSubmission,
  getSpecificStudentSubmission,
  deleteStudentSubmission,
} = require("../controllers/StudentSubmission");

router.post("/", createStudentSubmission);
router.delete("/:id", deleteStudentSubmission);
router.post("/getSpecific", getSpecificStudentSubmission);

module.exports = router;
