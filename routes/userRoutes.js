const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const protect = require("../middleware/Protect");
const allowRoles = require("../middleware/allowRoles");

const User = require("../models/User");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 Admin-only route (example)
router.get("/all",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  }
);

module.exports = router;
