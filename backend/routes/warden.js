const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Warden = require("../models/warden"); // Adjust if your file is named differently
const wardenAuth = require("../middlewares/warden");
const router = express.Router();
const Notification = require("../models/notification");


const JWT_SECRET = "12345";

// Warden Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide warden_name and password" });
  }

  try {
    const existingWarden = await Warden.findOne({ warden_name:username });

    if (existingWarden) {
      return res.status(409).json({ message: "Warden already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWarden = new Warden({
      warden_name:username,
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide warden_name and password" });
  }

  try {
    const warden = await Warden.findOne({ warden_name:username });

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

//
router.get("/notifications", wardenAuth,async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Warden posts a new notification
router.post("/notifications", wardenAuth, async (req, res) => {
  const { headline } = req.body;

  if (!headline) {
    return res.status(400).json({ message: "Headline is required" });
  }

  try {
    const notification = new Notification({
      headline,
      postedBy: req.warden.warden_name,
      role: "Warden"
    });

    await notification.save();
    res.status(201).json({ message: "Notification posted by warden", notification });
  } catch (error) {
    console.error("Error posting warden notification:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
