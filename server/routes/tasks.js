const express = require("express");
const Task = require("../models/Task");
const { auth, adminAuth, employeeAuth } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create task (Admin only)
router.post("/", adminAuth, body("title").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, description, dueDate, priority, assignedTo } = req.body;
  try {
    // If assignedTo is "all", create a task for each employee
    if (assignedTo === "all") {
      const User = require("../models/User");
      const employees = await User.find({ role: "user" });

      if (employees.length === 0) {
        return res
          .status(400)
          .json({ message: "No employees found to assign task to" });
      }

      const tasks = [];
      for (const employee of employees) {
        const task = new Task({
          title,
          description,
          dueDate,
          priority,
          assignedTo: employee._id,
          createdBy: req.user.id,
          isAssignedToAll: true, // Flag to indicate this was part of an "assign to all" operation
        });
        await task.save();
        tasks.push(task);
      }

      return res.status(201).json({
        message: `Task created for ${tasks.length} employees`,
        tasks: tasks,
        assignedToAll: true,
      });
    }

    // Regular single assignment
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// List tasks with pagination & filters
router.get("/", auth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search)
      filter.title = { $regex: req.query.search, $options: "i" };

    // Role-based filtering
    if (req.user.role === "user") {
      // Employees can only see tasks assigned to them
      filter.assignedTo = req.user.id;
    }
    // Admins can see all tasks (no additional filter)

    const [total, data] = await Promise.all([
      Task.countDocuments(filter),
      Task.find(filter)
        .sort({ dueDate: 1 })
        .skip(skip)
        .limit(limit)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email"),
    ]);
    const pages = Math.ceil(total / limit);

    res.json({ data, total, page, pages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get single
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update task (Admin only for full update, Employee for status only)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check if user can update this task
    if (req.user.role === "user") {
      // Employees can only update tasks assigned to them
      if (task.assignedTo.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this task" });
      }
      // Employees can only update status, not other fields
      const { status } = req.body;
      const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: { status } },
        { new: true }
      )
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");
      return res.json(updated);
    }

    // Admin can update all fields
    if (req.user.role === "admin") {
      const updates = (({
        title,
        description,
        dueDate,
        priority,
        assignedTo,
        status,
      }) => ({ title, description, dueDate, priority, assignedTo, status }))(
        req.body
      );

      Object.keys(updates).forEach(
        (k) => updates[k] === undefined && delete updates[k]
      );

      const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
      )
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");

      return res.json(updated);
    }

    return res.status(403).json({ message: "Not authorized" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Patch status (Employees can update their assigned tasks, Admins can update any)
router.patch("/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  if (!["pending", "in-progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check authorization
    if (req.user.role === "user") {
      // Employees can only update tasks assigned to them
      if (task.assignedTo.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this task" });
      }
    }
    // Admins can update any task

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Patch priority (Admin only)
router.patch("/:id/priority", adminAuth, async (req, res) => {
  const { priority } = req.body;
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ message: "Invalid priority" });
  }
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
