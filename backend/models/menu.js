const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  photo: {
    type: String, // URL or file path
    default: ''
  }
});

module.exports = mongoose.model('Menu', menuSchema);
