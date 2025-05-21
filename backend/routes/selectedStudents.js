const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Warden = require("../models/warden"); // Adjust if your file is named differently
const wardenAuth = require("../middlewares/warden");
const router = express.Router();
const SelectedStudent = require("../models/selectedVoters");

router.post("/", async (req, res) => {
  const { username, rollno, department } = req.body;
  try {
    const exists = await SelectedStudent.findOne({ rollno });
    if (exists) {
      return res.status(409).json({ message: "Already selected" });
    }
    const newStudent = new SelectedStudent({ username, rollno, department });
    await newStudent.save();
    res.status(201).json({ message: "Student selected" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await SelectedStudent.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});
module.exports = router;