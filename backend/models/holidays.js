const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  occasion: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Holiday", holidaySchema);
