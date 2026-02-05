// routes/attendanceRoutes.js
const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const protect = require("../middleware/protect"); // use the one you already standardized

const router = express.Router();

// 🔐 All attendance routes require login
router.use(protect);

// GET attendance (can be filtered by class/date/student)
router.get("/", attendanceController.getAttendance);

// CREATE single attendance (optional / future use)
router.post("/", attendanceController.createAttendance);


router.post("/bulk", attendanceController.bulkCreateAttendance);

// UPDATE / DELETE
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
