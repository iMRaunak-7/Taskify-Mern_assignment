const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { auth, adminAuth } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Get all users (admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Create new user (admin only)
router.post(
  "/",
  adminAuth,
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role = "user" } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashed, role });
      await user.save();

      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// Update user (admin only)
router.put(
  "/:id",
  adminAuth,
  body("name").optional().notEmpty(),
  body("email").optional().isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updates = {};
      if (req.body.name) updates.name = req.body.name;
      if (req.body.email) updates.email = req.body.email;
      if (req.body.role) updates.role = req.body.role;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
      ).select("-password");

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// Delete user (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update user profile
router.put(
  "/profile",
  auth,
  body("name").optional().notEmpty(),
  body("email").optional().isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updates = {};
      if (req.body.name) updates.name = req.body.name;
      if (req.body.email) updates.email = req.body.email;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true }
      ).select("-password");

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
