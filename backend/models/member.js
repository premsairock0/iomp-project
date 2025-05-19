const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true 
  },
  designation: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    default: "", 
  },
});

module.exports = mongoose.model("Member", memberSchema);
