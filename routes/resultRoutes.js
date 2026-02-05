const express = require("express");
const {
  getResults,
  getResult,
  createResult,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

const protect = require("../middleware/Protect");
const allowRoles = require("../middleware/allowRoles");

const router = express.Router();

// Everyone must be logged in
router.get("/", protect, getResults);
router.get("/:id", protect, getResult);

// Create/update allowed (admin + standard), but controller will enforce ownership
router.post("/", protect, createResult);
router.put("/:id", protect, updateResult);

// Delete admin only
router.delete("/:id", protect, allowRoles("admin"), deleteResult);

module.exports = router;
