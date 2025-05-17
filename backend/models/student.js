const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  password: {
    type: String,
    required: true
  },
  typeofstudent: {
    type: String,
    required: true,
    enum :['Dayscholar','Hosteller','International']
  },
  address: {
    type: String,
    required: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  department : {
    type : String,
    required : true ,
     trim: true
  },
  roomno: {
    type: Number,
    default: null
  },
  messopted: {
    type: Boolean,
    default: false
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Student', studentSchema);
