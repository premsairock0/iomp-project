const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  imgtitle: {
    type: String,
    required: true
  },
  serviceimageurl: {
    type: String,
    required: true
  },
  servicetitle: {
    type: String,
    required: true,
    enum: [
      "Plumbing",
      "Electricity",
      "Cleaning",
      "Carpentry",
      "Internet",
      "Laundry",
      "Catering"
    ]
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Service", serviceSchema);
