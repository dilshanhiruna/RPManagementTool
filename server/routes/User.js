const express = require("express");
const router = express.Router();

const {
  getStudentsByKeyword,
  getUserById,
  getAllSupervisors,
} = require("../controllers/User");

router.get("/students/:keyword", getStudentsByKeyword);
router.get("/supervisors", getAllSupervisors);
router.get("/:id", getUserById);

module.exports = router;
