const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  chef_name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Chef', chefSchema);