const mongoose = require('mongoose');

const roomRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  incomeCertificate: {
    type: String, // Treating as string field for now
    required: true
  },
  nativePlace: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  roomNo: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('RoomRequest', roomRequestSchema);
