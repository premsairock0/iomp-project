const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  warden_name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Warden', wardenSchema);