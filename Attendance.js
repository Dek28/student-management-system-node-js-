// models/Attendance.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true }, // could be Student _id
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
    remark: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
