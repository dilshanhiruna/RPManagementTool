const express = require("express");
const router = express.Router();

const {
  getStudentsByKeyword,
  getUserById,
  getAllSupervisors,
  signup,
  allusers,
  update,
  deleteuser
} = require("../controllers/User");

router.get("/students/:keyword", getStudentsByKeyword);
router.get("/supervisors", getAllSupervisors);
router.get("/:id", getUserById);
router.post("/usersignup", signup);
router.get("/allusers", allusers);
router.put("/user/update/:id", update);
router.delete("/user/delete/:id", deleteuser);

module.exports = router;
