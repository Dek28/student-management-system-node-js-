const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

const protect = require("../middleware/protect");
const allowRoles = require("../middleware/allowRoles");


//Get students
// Admin → all students
// Standard → only students they registered
router.get(
  "/",
  protect,
  studentController.getStudents
);

// Get single student (ownership check inside controller)
router.get(
  "/:id",
  protect,
  studentController.getStudent
);

//  Create student (both admin & standard)
router.post(
  "/",
  protect,
  studentController.createStudent
);

// ✏️ Update student
router.put(
  "/:id",
  protect,
  studentController.updateStudent
);

// Delete student admin only 
router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  studentController.deleteStudent
);

module.exports = router;
