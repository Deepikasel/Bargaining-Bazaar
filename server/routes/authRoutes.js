

// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, password: hashed });
    await user.save();
    res.status(201).json({ message: "Signup successful", user: { name: user.name, email: user.email, mobile: user.mobile } });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // sign token (optional)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email, mobile: user.mobile } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
