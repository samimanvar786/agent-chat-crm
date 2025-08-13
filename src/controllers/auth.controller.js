// src/controllers/auth.controller.js

const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, phone, address, commissionRate, role } =
    req.body;

  try {
    const adminExists = await User.findOne({ role: "admin" });
    console.log("Admin Exists:", adminExists);

    // --- First Admin Registration (no login required) ---
    if (!adminExists && role === "admin") {
      const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
        commissionRate,
        role: "admin",
      });

      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
        message: "Admin created successfully",
      });
    }

    // --- Require login for all other users ---
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Only Admin can create users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create users" });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (agent or admin)
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      commissionRate,
      role,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Agent created successfully",
    });
  } catch (err) {
    console.error("Register User Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = { registerUser, loginUser };
