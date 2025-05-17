const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Warden = require("../models/warden"); // Adjust if your file is named differently
const router = express.Router();

const JWT_SECRET = "12345";

// Warden Signup
router.post("/signup", async (req, res) => {
  const { warden_name, password } = req.body;

  if (!warden_name || !password) {
    return res.status(400).json({ message: "Please provide warden_name and password" });
  }

  try {
    const existingWarden = await Warden.findOne({ warden_name });

    if (existingWarden) {
      return res.status(409).json({ message: "Warden already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWarden = new Warden({
      warden_name,
      password: hashedPassword,
    });

    await newWarden.save();

    return res.status(201).json({ message: "Warden registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Warden Signin
router.post("/signin", async (req, res) => {
  const { warden_name, password } = req.body;

  if (!warden_name || !password) {
    return res.status(400).json({ message: "Please provide warden_name and password" });
  }

  try {
    const warden = await Warden.findOne({ warden_name });

    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    const isMatch = await bcrypt.compare(password, warden.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: warden._id, warden_name: warden.warden_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
