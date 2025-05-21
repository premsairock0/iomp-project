const mongoose = require('mongoose');

const selectedStudentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  rollno: {
    type: String,
    required: true,
    trim: true,
    unique: true, // assuming a student can be selected only once
  },
  department: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('SelectedStudent', selectedStudentSchema);