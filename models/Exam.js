// models/Exam.js
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String }, // or ObjectId
    date: { type: Date },
    maxMarks: { type: Number, default: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
