// controllers/examController.js
const Exam = require("../models/Exam");

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch {
    res.status(500).json({ message: "Failed to load exams" });
  }
};

exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.json(exam);
  } catch {
    res.status(500).json({ message: "Failed to save exam" });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(exam);
  } catch {
    res.status(500).json({ message: "Failed to update exam" });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete exam" });
  }
};
