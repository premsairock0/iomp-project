const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const router = express.Router();
const Notification = require("../models/notification");
const studentAuth = require("../middlewares/student");
const MessBill = require("../models/MessBill"); // ✅ Added this line

const JWT_SECRET = "12345";

// Student Signup
router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    phone,
    password,
    typeofstudent,
    address,
    rollno,
    department,
    year
  } = req.body;

  if (
    !username ||
    !email ||
    !phone ||
    !password ||
    !typeofstudent ||
    !address ||
    !rollno ||
    !department ||
    !year
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const studentData = {
      username,
      email,
      phone,
      password: hashedPassword,
      typeofstudent,
      address,
      rollno,
      department,
      year,
      messopted: typeofstudent === "Hosteller" // ✅ auto-messopted for hostellers
    };

    const newStudent = new Student(studentData);
    await newStudent.save();

    // ✅ Create mess bill record if student opted for mess
    if (newStudent.messopted) {
      await MessBill.create({
        student: newStudent._id,
        isPaid: false,
        paymentDate: null
      });
    }

    return res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Student Signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const student = await Student.findOne({ email: username });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: student._id,
        rollno: student.rollno,
        typeofstudent: student.typeofstudent
      },
      JWT_SECRET
    );

    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get all active notifications
router.get("/notifications", studentAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({
      createdAt: -1
    });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logged-in student's details
// Protected route
router.get("/me", studentAuth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;