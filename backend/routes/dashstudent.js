const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const Member = require('../models/member');
const Chef = require('../models/chef');
const Warden = require('../models/warden');
const Menu= require("../models/menu");

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

module.exports = router;

