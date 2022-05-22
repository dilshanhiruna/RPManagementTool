const express = require("express");
const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  getaSubmission,
  updateSubmission,
  deleteSubmission,
} = require("../controllers/Submissions");

router.post("/", createSubmission); //add a new submission
router.get("/", getSubmissions); //get all submissions
router.get("/:id", getaSubmission); //get one submission
router.put("/:id", updateSubmission); //update submission details
router.delete("/:id", deleteSubmission); //delete submission

module.exports = router;
