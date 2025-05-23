const express = require('express');
const router = express.Router();

const wardenAuth = require('../middlewares/warden');
const Student = require('../models/student');
const LeaveLetter = require('../models/LeaveLetter');  
const Voting = require('../models/voting'); 
const Warden = require('../models/warden');
const bcrypt = require("bcrypt");
// const Service = require('../models/service');
const ServiceRequest = require("../models/request");




// Get all students info (protected)
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all leave letters (protected)
router.get('/leaveletters', wardenAuth, async (req, res) => {
  try {
    const letters = await LeaveLetter.find({});
    res.status(200).json({ leaveLetters: letters });
  } catch (error) {
    console.error('Error fetching leave letters:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve a leave letter by id (protected)
router.patch('/leaveletters/:id/approve', wardenAuth, async (req, res) => {
  try {
    const letter = await LeaveLetter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ message: 'Leave letter not found' });
    }

    letter.approved = true;
    await letter.save();

    res.status(200).json({ message: 'Leave letter approved', leaveLetter: letter });
  } catch (error) {
    console.error('Error approving leave letter:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Post voting info (warden only, protected)
router.post('/voting', wardenAuth, async (req, res) => {
  const { studentIds } = req.body;
  if (!Array.isArray(studentIds)) {
    return res.status(400).json({ message: 'studentIds must be an array' });
  }

  try {
    let voting = await Voting.findOne({});
    if (voting) {
      voting.studentIds = studentIds;
      voting.postedAt = new Date();
    } else {
      voting = new Voting({ studentIds });
    }
    await voting.save();
    res.status(200).json({ message: 'Voting info posted', voting });
  } catch (error) {
    console.error('Error posting voting info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get voting info (protected)
router.get('/voting', wardenAuth, async (req, res) => {
  try {
    const voting = await Voting.findOne({}).populate('studentIds', 'username rollno department');
    res.status(200).json({ voting });
  } catch (error) {
    console.error('Error fetching voting info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a single voting entry by ID (protected)
router.delete('/voting/:id', wardenAuth, async (req, res) => {
  const votingId = req.params.id;
  try {
    const deletedVoting = await Voting.findByIdAndDelete(votingId);
    if (!deletedVoting) {
      return res.status(404).json({ message: 'Voting entry not found' });
    }
    res.status(200).json({ message: 'Voting entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting voting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/warden/service-requests
router.get('/service-requests', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({}).populate('studentId', 'username email');
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service requests', error: err.message });
  }
});


// 🧑‍✈️ Warden: Update service request status wardenAuth,
router.put('/service-requests/:id', async (req, res) => {
  const { status } = req.body;

  // Validate status
  if (!['Pending', 'Approved', 'Not Available'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Prevent status change if current status is not Pending
    if (request.status !== 'Pending') {
      return res.status(400).json({ 
        message: 'Status update not allowed. Once changed from Pending, status cannot be changed again.' 
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: 'Service request status updated', request });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
});


router.put("/change-password", wardenAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    const warden= await Warden.findById(req.warden.id);

    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, warden.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    warden.password = hashedNewPassword;
    await warden.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
