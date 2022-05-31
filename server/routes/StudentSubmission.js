const express = require("express");
const router = express.Router();

const {
  createStudentSubmission,
  getSpecificStudentSubmission,
  deleteStudentSubmission,
  getSubmissionOfSupervisor,
  getSubmissionsOfPanelMember,
} = require("../controllers/StudentSubmission");

router.get("staff/:id", getSubmissionOfSupervisor);
router.get("panel/:id", getSubmissionsOfPanelMember);
router.post("/", createStudentSubmission);
router.delete("/:id", deleteStudentSubmission);
router.post("/getSpecific", getSpecificStudentSubmission);

module.exports = router;
