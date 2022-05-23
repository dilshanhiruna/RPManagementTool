const express = require("express");
const router = express.Router();

const { getStudentsByKeyword, getUserById } = require("../controllers/User");

router.get("/students/:keyword", getStudentsByKeyword);
router.get("/:id", getUserById);

module.exports = router;
