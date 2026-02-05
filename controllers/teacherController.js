const Teacher = require("../models/Teacher");

// GET teachers
// Admin -> all teachers
// Standard -> only teachers they created
exports.getTeachers = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { createdBy: req.user.id };
    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "failed to load teachers" });
  }
};

// GET single teachern
// Admin -> any
// Standard -> only own
exports.getTeacher = async (req, res) => {
  try {
    const role = req.user?.role || "standard";

    const filter =
      role === "admin"
        ? {}
        : { createdBy: req.user._id };

    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    console.error("getTeachers error:", err);
    res.status(500).json({ message: "failed to load teachers" });
  }
};

// CREATE teacher
// both admin & standard can create, but stamp ownership
exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: "failed to save teacher" });
  }
};

// UPDATE teacher
// Admin -> any
// Standard -> only own
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }

    if (
      req.user.role !== "admin" &&
      teacher.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(teacher, req.body);
    await teacher.save();

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: "failed to update teacher" });
  }
};

// DELETE teacher
// If you want: admin only (recommended) -> enforce in route using allowRoles("admin")
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }

    // OPTIONAL safety: even if route is admin-only, keep this:
    if (
      req.user.role !== "admin" &&
      teacher.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher Deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete teacher" });
  }
};
