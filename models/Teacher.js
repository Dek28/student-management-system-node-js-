const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String },
    email: { type: String },
    phone: { type: String },

    // 🔐 OWNERSHIP
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
