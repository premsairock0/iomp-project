const mongoose = require('mongoose');

const messBillSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true // One record per student
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('MessBill', messBillSchema);
