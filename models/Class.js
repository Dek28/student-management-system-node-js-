// models/Class.js
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Class 10A"
    year: { type: Number },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
