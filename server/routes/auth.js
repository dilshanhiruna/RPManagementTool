const express = require("express");
const router = express.Router();

const {
  login
} = require("../controllers/Auth");

router.post("/userlogin", login);

module.exports = router;
