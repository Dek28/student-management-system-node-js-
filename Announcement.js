// models/Announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    audience: { type: String, default: "All" } // e.g., "Students", "Teachers"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
