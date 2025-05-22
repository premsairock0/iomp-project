const mongoose = require("mongoose");


const serviceRequestSchema = new mongoose.Schema({
  servicetitle: {
    type: String,
    enum: ["Plumbing",
      "Electricity",
      "Cleaning",
      "Carpentry",
      "Internet",
      "Laundry",
      "Catering"], // example enum values, update to your allowed values
    required: true
  },
  description: { type: String, required: true },
  roomNo: { type: String, required: true }, // changed from Number to String
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Not Available'],
    default: 'Pending'
  }
});


module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
