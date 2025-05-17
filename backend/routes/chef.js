const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Chef = require("../models/chef"); // Adjust if named differently
const router = express.Router();

const JWT_SECRET = "12345";

// Chef Signup
router.post("/signup", async (req, res) => {
  const { chef_name, password } = req.body;

  if (!chef_name || !password) {
    return res.status(400).json({ message: "Please provide chef_name and password" });
  }

  try {
    const existingChef = await Chef.findOne({ chef_name });

    if (existingChef) {
      return res.status(409).json({ message: "Chef already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newChef = new Chef({
      chef_name,
      password: hashedPassword,
    });

    await newChef.save();

    return res.status(201).json({ message: "Chef registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Chef Signin
router.post("/signin", async (req, res) => {
  const { chef_name, password } = req.body;

  if (!chef_name || !password) {
    return res.status(400).json({ message: "Please provide chef_name and password" });
  }

  try {
    const chef = await Chef.findOne({ chef_name });

    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    const isMatch = await bcrypt.compare(password, chef.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: chef._id, chef_name: chef.chef_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
