const express = require('express');
const router = express.Router();

const wardenAuth = require('../middlewares/warden');
const Student = require('../models/student');
const LeaveLetter = require('../models/letter');  
const Voting = require('../models/voting'); 

// Get all students info (protected)
router.get('/students', wardenAuth, async (req, res) => {
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


module.exports = router;
