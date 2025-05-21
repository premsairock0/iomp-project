const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");


const Student = require('../models/student');
const Member = require('../models/member');
const Chef = require('../models/chef');
const Warden = require('../models/warden');
const Menu= require("../models/menu");
const studentAuth = require("../middlewares/student");



router.get("/menu", async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json({ Menu: menus });
  } catch (err) {
    res.status(500).json({ message: "Error fetching menus", error: err.message });
  }
});

router.get('/members', async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/change-password", studentAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    const student = await Student.findById(req.student.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedNewPassword;
    await student.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

