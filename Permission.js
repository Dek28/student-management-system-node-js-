// models/Permission.js
const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);
