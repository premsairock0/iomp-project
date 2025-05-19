const express = require("express");
const router = express.Router();
const LeaveLetter = require("../models/LeaveLetter"); // Adjust the path as needed
const studentAuth = require("../middlewares/student");
const wardenAuth = require("../middlewares/warden");
// POST /api/letters - student sends a leave letter
router.post("/",studentAuth,async (req, res) => {
  try {
    const { rollno, description } = req.body;

    // Simple validation
    if (!rollno || !description) {
      return res.status(400).json({ message: "Roll number and description are required" });
    }
    
    // Create new leave letter
    const newLetter = new LeaveLetter({
      rollno,
      description,
      approved: false, // default
    });

    await newLetter.save();

    res.status(201).json({ message: "Leave letter submitted successfully", letter: newLetter });
  } catch (error) {
    console.error("Error submitting leave letter:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all leave letters
router.get("/",wardenAuth ,async (req, res) => {
  try {
    const letters = await LeaveLetter.find().sort({ createdAt: -1 });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch letters" });
  }
});

// PUT /api/studentletters/:id to update approval
router.put("/:id", wardenAuth,async (req, res) => {
  try {
    const { approved } = req.body;
    const letter = await LeaveLetter.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );
    res.json(letter);
  } catch (err) {
    res.status(500).json({ message: "Failed to update letter" });
  }
});


module.exports = router;