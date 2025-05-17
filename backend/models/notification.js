const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin", "Warden"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
