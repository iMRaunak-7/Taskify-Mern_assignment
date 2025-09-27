const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    dueDate: Date,
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    isAssignedToAll: { type: Boolean, default: false }, // Flag to indicate if this task was part of an "assign to all" operation
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
