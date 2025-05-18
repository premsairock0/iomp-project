const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  }],
  postedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Voting', votingSchema);
