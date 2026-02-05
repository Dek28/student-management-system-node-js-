// controllers/classController.js
const ClassModel = require("../models/Class");

exports.getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.json(classes);
  } catch {
    res.status(500).json({ message: "Failed to load classes" });
  }
};

exports.createClass = async (req, res) => {
  try {
    const cls = await ClassModel.create(req.body);
    res.json(cls);
  } catch {
    res.status(500).json({ message: "Failed to save class" });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const cls = await ClassModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(cls);
  } catch {
    res.status(500).json({ message: "Failed to update class" });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await ClassModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete class" });
  }
};
