const express = require("express");
const router = express.Router();
const Holiday = require("../models/holidays");

// POST route — Add a new holiday
router.post("/", async (req, res) => {
  try {
    const { occasion, date } = req.body;

    if (!occasion || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    const newHoliday = new Holiday({ occasion, date, day });
    await newHoliday.save();

    res.status(201).json({ message: "Holiday added successfully", holiday: newHoliday });
  } catch (err) {
    console.error("Error adding holiday:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route — Fetch holidays for student
router.get("/", async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.status(200).json({ holidays });
  } catch (err) {
    console.error("Error fetching holidays:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
