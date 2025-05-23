const express = require('express');
const cors = require('cors');
const app = express();
require("./connect/connect");

// Import routers
const admin_router = require("./routes/admin");
const warden_router = require("./routes/warden");
const chef_router = require("./routes/chef");
const student_router = require("./routes/student");
const menu_router = require("./routes/menu");
const dashchef_router = require("./routes/dashchef");
const dashwarden_router = require("./routes/dashwarden");
const dashadmin_router = require("./routes/dashadmin");
const dashstudent_router = require("./routes/dashstudent");
const student_letter = require("./routes/studentsLetters");
const photos = require("./routes/photo");
const event = require("./routes/event");
const holiday_router = require("./routes/holidayRoute");
const messBill_router = require("./routes/messBill");
const selectedStudents = require('./routes/selectedStudents');
const voteRouter = require('./routes/vote');
const results=require('./routes/results');




// ✅ Enable CORS for frontend (localhost:5173)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // only if needed
// }));
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use("/api/admin", admin_router);
app.use("/api/warden", warden_router);
app.use("/api/chef", chef_router);
app.use("/api/student", student_router);
app.use("/api/menu", menu_router);
app.use("/api/dashchef", dashchef_router);
app.use("/api/dashwarden", dashwarden_router);
app.use("/api/studentletters", student_letter);
app.use("/api/dashadmin",dashadmin_router);
app.use("/api/dashstudent",dashstudent_router);
app.use("/api/holidays", holiday_router);
app.use("/api/photos",photos)
app.use("/api/mess", messBill_router);
app.use("/api/event",event);
app.use("/api/selectedstudents",selectedStudents);
app.use("/api/vote", voteRouter);
app.use("/api/vote",results);

// Test route
app.get("/", (req, res) => {
  res.send("I am working");
});

// Start server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
