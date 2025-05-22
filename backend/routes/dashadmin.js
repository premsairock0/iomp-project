const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const Member = require('../models/member');
const Chef = require('../models/chef');
const Warden = require('../models/warden');
const Service = require('../models/service');
const adminAuth = require("../middlewares/admin");


router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/wardens', async (req, res) => {
  try {
    const wardens = await Warden.find({});
    res.status(200).json({ wardens });
  } catch (error) {
    console.error('Error fetching wardens:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/chefs', async (req, res) => {
  try {
    const chefs = await Chef.find({});
    res.status(200).json({ chefs });
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ message: 'Server error' });
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


router.post('/members', async (req, res) => {
  try {
    const { name, designation, image } = req.body;

    const newMember = new Member({ name, designation, image });
    await newMember.save();

    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Member with this name already exists' });
    }
    console.error('Error creating member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add new service type
router.post('/services', async (req, res) => {
  try {
    const { imgtitle, serviceimageurl, servicetitle, description } = req.body;
    const newService = new Service({ imgtitle, serviceimageurl, servicetitle, description });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error('Error adding service type:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
