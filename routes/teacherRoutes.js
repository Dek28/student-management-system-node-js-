const express = require("express");
const protect = require("../middleware/protect");
const allowRoles = require("../middleware/allowRoles");

const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getTeachers);
router.get("/:id", protect, allowRoles("admin"), getTeacher);
router.post("/", protect, allowRoles("admin"), createTeacher);
router.put("/:id", protect, allowRoles("admin"), updateTeacher);
router.delete("/:id", protect, allowRoles("admin"), deleteTeacher);

module.exports = router;
