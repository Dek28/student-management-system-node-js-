// controllers/attendanceController.js
const Attendance = require("../models/Attendance");

/**
 * GET attendance
 * Optional filters:
 *  - className
 *  - date
 *  - studentId
 */
exports.getAttendance = async (req, res) => {
  try {
    const filter = {};

    if (req.query.className) filter.className = req.query.className;
    if (req.query.date) filter.date = req.query.date;
    if (req.query.studentId) filter.studentId = req.query.studentId;

    const records = await Attendance.find(filter)
      .populate("studentId", "name regNo")
      .sort({ date: -1, createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error("getAttendance error:", err);
    res.status(500).json({ message: "Failed to load attendance" });
  }
};

/**
 * CREATE single attendance record
 * (kept for compatibility / future use)
 */
exports.createAttendance = async (req, res) => {
  try {
    const record = await Attendance.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(record);
  } catch (err) {
    console.error("createAttendance error:", err);
    res.status(500).json({ message: "Failed to save attendance" });
  }
};

/**
 * BULK CREATE attendance (CLASS-BASED)
 * Used by Attendance page
 */
exports.bulkCreateAttendance = async (req, res) => {
  try {
    const { className, date, records } = req.body;

    if (!className || !date || !Array.isArray(records)) {
      return res.status(400).json({
        message: "className, date and records[] are required",
      });
    }

    // 🚫 Prevent duplicate attendance for same class & date
    const exists = await Attendance.findOne({ className, date });
    if (exists) {
      return res.status(409).json({
        message: "Attendance already recorded for this class and date",
      });
    }

    const docs = records.map((r) => ({
      className,
      studentId: r.studentId,
      date,
      status: r.status,
      remark: r.remark || "",
      createdBy: req.user.id,
    }));

    const saved = await Attendance.insertMany(docs);
    res.status(201).json(saved);
  } catch (err) {
    console.error("bulkCreateAttendance error:", err);
    res.status(500).json({ message: "Failed to save attendance" });
  }
};

/**
 * UPDATE attendance
 */
exports.updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json(record);
  } catch (err) {
    console.error("updateAttendance error:", err);
    res.status(500).json({ message: "Failed to update attendance" });
  }
};

/**
 * DELETE attendance
 */
exports.deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json({ message: "Attendance deleted" });
  } catch (err) {
    console.error("deleteAttendance error:", err);
    res.status(500).json({ message: "Failed to delete attendance" });
  }
};
