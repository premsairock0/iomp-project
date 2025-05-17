const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Admin', adminSchema);