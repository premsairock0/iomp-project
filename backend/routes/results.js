const express = require("express");
const router = express.Router();
const Vote = require("../models/voting");

router.get("/results", async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidateId",
          totalVotes: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "selectedstudents",  // MongoDB collection name (lowercase plural of model)
          localField: "_id",
          foreignField: "_id",
          as: "candidateDetails"
        }
      },
      { $unwind: "$candidateDetails" },
      {
        $project: {
          _id: 1,
          totalVotes: 1,
          "candidateDetails.username": 1,
          "candidateDetails.rollno": 1,
          "candidateDetails.department": 1
        }
      },
      { $sort: { totalVotes: -1 } }
    ]);

    res.json(results);
  } catch (err) {
    console.error("Error fetching vote results:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET /api/vote/votedetails
router.get("/votedetails", async (req, res) => {
  try {
    const voteDetails = await Vote.aggregate([
      {
        $lookup: {
          from: "selectedstudents",  // collection for voters
          localField: "voterId",
          foreignField: "_id",
          as: "voterDetails"
        }
      },
      {
        $lookup: {
          from: "selectedstudents",  // collection for candidates
          localField: "candidateId",
          foreignField: "_id",
          as: "candidateDetails"
        }
      },
      { $unwind: "$voterDetails" },
      { $unwind: "$candidateDetails" },
      {
        $project: {
          _id: 0,
          voterId: "$voterDetails._id",
          voterUsername: "$voterDetails.username",
          voterRollno: "$voterDetails.rollno",
          candidateId: "$candidateDetails._id",
          candidateUsername: "$candidateDetails.username",
          candidateRollno: "$candidateDetails.rollno",
          candidateDepartment: "$candidateDetails.department",
          votedAt: "$createdAt"
        }
      }
    ]);

    res.json(voteDetails);
  } catch (err) {
    console.error("Error fetching detailed votes:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;