const mongoose = require("mongoose");

const MONGO_URI = 'mongodb+srv://prem:hostel123@hostel.gz2vg4n.mongodb.net/';

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(' MongoDB connection failed:', error);
    process.exit(1);
  }
};

connect();

