const mongoose = require('mongoose');

const leaveLetterSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('LeaveLetter', leaveLetterSchema);
