const express = require("express");
const router = express.Router();

const {
  createStudentSubmission,
  getSpecificStudentSubmission,
  deleteStudentSubmission,
  getSubmissionOfSupervisor,
  getSubmissionsOfPanelMember,
  addMarks,
  getTopicSubmissionsOfPanelMember,
} = require("../controllers/StudentSubmission");

router.get("/staff/:id", getSubmissionOfSupervisor);
router.get("/panel/:id", getSubmissionsOfPanelMember);
router.get("/panel/topic/:id", getTopicSubmissionsOfPanelMember);
router.post("/", createStudentSubmission);
router.put("/addMarks/:id", addMarks);
router.delete("/:id", deleteStudentSubmission);
router.post("/getSpecific", getSpecificStudentSubmission);

module.exports = router;
