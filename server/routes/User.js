const express = require("express");
const router = express.Router();

const { getStudentsByKeyword } = require("../controllers/User");

router.get("/students/:keyword", getStudentsByKeyword);

module.exports = router;
