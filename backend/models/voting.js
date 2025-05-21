const mongoose = require('mongoose');
const SelectedStudent=require('./selectedVoters');
const voteSchema = new mongoose.Schema({
  voterId: {
    type: String, // or mongoose.Schema.Types.ObjectId if linked to a User collection
    required: true,
    unique: true,  // ensures a voter can vote only once
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SelectedStudent',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);
