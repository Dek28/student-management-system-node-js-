// controllers/announcementController.js
const Announcement = require("../models/Announcement");

exports.getAnnouncements = async (req, res) => {
  try {
    const items = await Announcement.find().sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Failed to load announcements" });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const item = await Announcement.create(req.body);
    res.json(item);
  } catch {
    res.status(500).json({ message: "Failed to save announcement" });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const item = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch {
    res.status(500).json({ message: "Failed to update announcement" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
