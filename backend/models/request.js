const mongoose = require("mongoose");


const serviceRequestSchema = new mongoose.Schema({
  servicetitle: {
    type: String,
    enum: ['Internet Issue', 'Plumbing', 'Electricity', 'Cleaning'], // example enum values, update to your allowed values
    required: true
  },
  description: { type: String, required: true },
  roomNo: { type: String, required: true }, // changed from Number to String
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
