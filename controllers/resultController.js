const Result = require("../models/Result");
const Student = require("../models/Student");

// GET results
exports.getResults = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const results = await Result.find()
        .populate("student")
        .populate("exam")
        .sort({ createdAt: -1 });

      return res.json(results);
    }

    const results = await Result.find()
      .populate({
        path: "student",
        match: { createdBy: req.user.id },
      })
      .populate("exam")
      .sort({ createdAt: -1 });

    const filteredResults = results.filter((r) => r.student);
    res.json(filteredResults);
  } catch (err) {
    res.status(500).json({ message: "failed to load results" });
  }
};

// GET single result
exports.getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("student")
      .populate("exam");

    if (!result) return res.status(404).json({ message: "result not found" });

    if (
      req.user.role !== "admin" &&
      result.student.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "failed to load result" });
  }
};

// CREATE result (SECURE)
exports.createResult = async (req, res) => {
  try {
    const { student } = req.body;

    const stu = await Student.findById(student);
    if (!stu) return res.status(404).json({ message: "Student not found" });

    // Standard users can only create results for their own students
    if (req.user.role !== "admin" && stu.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed to save result" });
  }
};

// UPDATE result (SECURE)
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("student");
    if (!result) return res.status(404).json({ message: "result not found" });

    // Standard users can only update results for their own students
    if (
      req.user.role !== "admin" &&
      result.student.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // If request tries to change student, validate ownership of new student too
    if (req.body.student && req.user.role !== "admin") {
      const newStu = await Student.findById(req.body.student);
      if (!newStu) return res.status(404).json({ message: "Student not found" });

      if (newStu.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    Object.assign(result, req.body);
    await result.save();

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: "failed to update result" });
  }
};

// DELETE result (admin only – enforced in route)
exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete result" });
  }
};
