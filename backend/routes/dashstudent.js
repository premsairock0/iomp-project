
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const Student = require('../models/student');
const Member = require('../models/member');
const Chef = require('../models/chef');
const Warden = require('../models/warden');
const Menu = require("../models/menu");
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
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ service });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service', error: err.message });
  }
});

// POST /service-requests
router.post('/service-requests', async (req, res) => {
  try {
    const { servicetitle, description, roomNo, studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: "Student ID missing" });
    }

    const request = new ServiceRequest({ servicetitle, description, roomNo, studentId });
    await request.save();

    res.status(201).json({ message: 'Service request submitted', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /service-requests
router.get('/service-requests', async (req, res) => {
  try {
    const { studentId } = req.query;
    if (!studentId) {
      return res.status(400).json({ message: 'Student ID missing in query' });
    }
    const requests = await ServiceRequest.find({ studentId }).sort({ createdAt: -1 });
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
