const express = require("express");
const router = express.Router();
const Vote = require("../models/voting");
const verifyStudentToken = require('../middlewares/student');

router.post("/", verifyStudentToken, async (req, res) => {
  // Get rollno from the decoded JWT payload attached by middleware
  const voterId = req.student?.rollno;  // instead of req.session.user?.rollno

  if (!voterId) {
    return res.status(401).json({ message: "Unauthorized: User not logged in." });
  }

  const { candidateId } = req.body;

  if (!candidateId) {
    return res.status(400).json({ message: "Candidate ID is required." });
  }

  try {
    const alreadyVoted = await Vote.findOne({ voterId });

    if (alreadyVoted) {
      return res.status(409).json({ message: "You have already voted!" });
    }

    const vote = new Vote({ voterId, candidateId });
    await vote.save();

    res.status(201).json({ message: "Vote cast successfully!" });
  } catch (err) {
    console.error("Vote Error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


module.exports = router;