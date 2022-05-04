const express = require("express");
const router = express.Router();

const {
  createGroup,
  updateStudentsInGroup,
  closeGroup,
  updateResearchTopic,
  updateSupervisor,
  updateCosupervisor,
  updatePanelmember,
  updateTopicFeedback,
  updateTopicDetailDocument,
  getAllStudentGroups,
  getStudentGroupById,
  deleteStudentGroup,
} = require("../controllers/StudentGroups");

router.post("/", createGroup);
router.put("/:id", updateStudentsInGroup);
router.put("/close/:id", closeGroup);
router.put("/researchtopic/:id", updateResearchTopic);
router.put("/supervisor/:id", updateSupervisor);
router.put("/cosupervisor/:id", updateCosupervisor);
router.put("/panelmember/:id", updatePanelmember);
router.put("/topicfeedback/:id", updateTopicFeedback);
router.put("/topicdetail/:id", updateTopicDetailDocument);
router.get("/", getAllStudentGroups);
router.get("/:id", getStudentGroupById);
router.delete("/:id", deleteStudentGroup);

module.exports = router;
