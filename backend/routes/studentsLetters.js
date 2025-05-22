const express = require("express");
const router = express.Router();
const LeaveLetter = require("../models/LeaveLetter"); // Adjust the path as needed
const studentAuth = require("../middlewares/student");
const wardenAuth = require("../middlewares/warden");

// POST /api/letters - student sends a leave letter
router.post("/", studentAuth, async (req, res) => {
  try {
    const { rollno, description } = req.body;
    const loggedInRollNo = req.student.rollno;

    if (!rollno || !description) {
      return res.status(400).json({ message: "Roll number and description are required" });
    }
    if (rollno !== loggedInRollNo) {
      return res.status(403).json({ message: "You are not allowed to send a letter for another student." });
    }

    const newLetter = new LeaveLetter({
      rollno,
      description,
      status: "pending", // use 'pending' here, not 'approved'
    });

    await newLetter.save();

    res.status(201).json({
      message: "Leave letter submitted successfully",
      letter: newLetter,
    });
  } catch (error) {
    console.error("Error submitting leave letter:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all leave letters
router.get("/", wardenAuth, async (req, res) => {
  try {
    const letters = await LeaveLetter.find().sort({ createdAt: -1 });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch letters" });
  }
});

// GET all leave letters of current student
router.get("/myletters", studentAuth, async (req, res) => {
  try {
    // console.log("Authenticated User:", req.student); // Add this line
    const studentRollNo = req.student.rollno; // assuming token gives rollno
    const letters = await LeaveLetter.find({ rollno: studentRollNo }).sort({ createdAt: -1 });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/studentletters/:id to update status
router.put("/:id", wardenAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'approved' or 'rejected'" });
    }

    const letter = await LeaveLetter.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!letter) {
      return res.status(404).json({ message: "Leave letter not found" });
    }

    res.json(letter);
  } catch (err) {
    res.status(500).json({ message: "Failed to update leave letter" });
  }
});

// DELETE /api/studentletters/:id to delete a leave letter
router.delete("/:id", wardenAuth, async (req, res) => {
  try {
    const letter = await LeaveLetter.findByIdAndDelete(req.params.id);

    if (!letter) {
      return res.status(404).json({ message: "Leave letter not found" });
    }

    res.json({ message: "Leave letter deleted successfully" });
  } catch (err) {
    console.error("Failed to delete leave letter:", err);
    res.status(500).json({ message: "Failed to delete leave letter" });
  }
});

module.exports = router;