const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

// Create a new menu card (no auth middleware here)
 router.post("/card", async (req, res) => {
  const { title, description, photo } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const existingMenu = await Menu.findOne({ title });
    if (existingMenu) {
      return res.status(409).json({ message: "Menu for this day already exists" });
    }

    const newMenu = new Menu({ title, description, photo });
    await newMenu.save();

    res.status(201).json({ message: "Menu created", menu: newMenu });
  } catch (err) {
    res.status(500).json({ message: "Error creating menu", error: err.message });
  }
});

module.exports = router;
