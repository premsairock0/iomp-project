const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // fixed import
const router = express.Router();

const JWT_SECRET = "12345";

// Admin Signup
router.post("/signup", async (req, res) => {
  const { admin_name, password } = req.body;

  if (!admin_name || !password) {
    return res.status(400).json({ message: "Please provide admin_name and password" }); // 400 Bad Request
  }

  try {
    const existingAdmin = await Admin.findOne({ admin_name });

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" }); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      admin_name,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({ message: "Admin registered successfully" }); // 201 Created
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" }); // 500 Internal Server Error
  }
});

// Admin Signin
router.post("/signin", async (req, res) => {
  const { admin_name, password } = req.body;

  if (!admin_name || !password) {
    return res.status(400).json({ message: "Please provide admin_name and password" }); // 400 Bad Request
  }

  try {
    const admin = await Admin.findOne({ admin_name });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" }); // 404 Not Found
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
    }

    const token = jwt.sign(
      { id: admin._id, admin_name: admin.admin_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Signin successful", token }); // 200 OK
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" }); // 500 Internal Server Error
  }
});

module.exports = router;