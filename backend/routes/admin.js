const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // fixed import
const Student = require("../models/student");
const Warden = require("../models/warden");
const Chef = require("../models/chef");
const adminAuth = require("../middlewares/admin");
const Notification = require("../models/notification");

const router = express.Router();

const JWT_SECRET = "12345";

// Admin Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" }); // 400 Bad Request
  }

  try {
    const existingAdmin = await Admin.findOne({ admin_name: username });

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" }); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      admin_name:username,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({ message: "Admin registered successfully" }); // 201 Created
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" }); // 500 Internal Server Error
  }
});

// Admin Signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username|| !password) {
    return res.status(400).json({ message: "Please provide username and password" }); // 400 Bad Request
  }

  try {
    const admin = await Admin.findOne({ admin_name: username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" }); // 404 Not Found
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
    }

    const token = jwt.sign(
      { id: admin._id, admin_name: admin.admin_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Signin successful", token }); // 200 OK
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" }); // 500 Internal Server Error
  }
});

// Get all student details
router.get("/students", adminAuth, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all warden details
router.get("/wardens", adminAuth, async (req, res) => {
  try {
    const wardens = await Warden.find();
    res.status(200).json({ wardens });
  } catch (error) {
    console.error("Error fetching wardens:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all chef details
router.get("/chefs", adminAuth, async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json({ chefs });
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin posts a new notification
router.post("/notifications", adminAuth, async (req, res) => {
  const { headline } = req.body;

  if (!headline) {
    return res.status(400).json({ message: "Headline is required" });
  }

  try {
    const notification = new Notification({
      headline,
      postedBy: req.admin.admin_name,
      role: "Admin"
    });

    await notification.save();
    res.status(201).json({ message: "Notification posted by admin", notification });
  } catch (error) {
    console.error("Error posting admin notification:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//change password
// Change admin password
router.put("/change-password", adminAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});



//admin can delete a notification

router.put("/notifications/:id/close", adminAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Only admins can close (we're already in admin.js and using adminAuth)
    notification.isActive = false;
    await notification.save();

    res.status(200).json({
      message: "Notification closed successfully",
      notification,
    });
  } catch (error) {
    console.error("Error closing notification:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// admin can see the notifications 
// Get all notifications
router.get("/notifications", adminAuth, async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;