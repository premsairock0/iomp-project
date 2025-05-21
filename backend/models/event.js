const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventtitle: {
     type: String, required: true 
    },
  eventimageurl: { 
    type: String, required: true 
  },
  insidetitle: { type: String, 
    required: true 
},
  description: {
     type: String, required: true
     },
  mainimageUrl: {
     type: String, required: true
     },
  createdAt: { 
    type: Date, default: Date.now
 }
});

module.exports = mongoose.model('event', EventSchema);
