const mongoose = require('mongoose');
const student=require("./student")
const votingSchema = new mongoose.Schema({
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  }],
  postedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Voting', votingSchema);
