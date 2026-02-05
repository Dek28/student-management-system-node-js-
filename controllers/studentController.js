const Student = require("../models/Student");

// GET students
// Admin → all
// Standard → own
exports.getStudents = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? {}
        : { createdBy: req.user.id };

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (
      req.user.role !== "admin" &&
      student.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (
      req.user.role !== "admin" &&
      student.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(student, req.body);
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE student (admin only – already enforced by route)
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
