const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const Student = require('../models/student');
const Member = require('../models/member');
const Chef = require('../models/chef');
const Warden = require('../models/warden');
const Menu= require("../models/menu");
const studentAuth = require("../middlewares/student");
const Service = require('../models/service');
const ServiceRequest = require("../models/request");

// GET all menus
router.get("/menu", async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json({ Menu: menus });
  } catch (err) {
    res.status(500).json({ message: "Error fetching menus", error: err.message });
  }
});

// GET all members
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all services (studentAuth protected)
router.get('/services', studentAuth, async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
});

// POST /service-requests - Create a new service request
router.post('/service-requests/:id', studentAuth, async (req, res) => {
  try {
    console.log('req.student:', req.student);  // Debug

    const { servicetitle, description, roomNo } = req.body;
    const studentId = req.student?._id;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID missing in token" });
    }

    const request = new ServiceRequest({ servicetitle, description, roomNo, studentId });
    await request.save();

    res.status(201).json({ message: 'Service request submitted', request });
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// GET /service-requests - Get all own service requests
router.get('/service-requests', studentAuth, async (req, res) => {
  try {
    const studentId = req.student._id;
    const requests = await ServiceRequest.find({ studentId }).sort({ createdAt: -1 });
    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching student requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /change-password - Change student password
router.put("/change-password", studentAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    // Use req.student._id to find student
    const student = await Student.findById(req.student._id);

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
