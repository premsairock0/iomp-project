const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");
const verifyChefToken = require("../middlewares/chef"); // adjust path as needed

// Get all menu items for chef dashboard
router.get("/menu", verifyChefToken, async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menus", error: err.message });
  }
});

// Update description and photo for a menu item by title (day)
router.put("/menu/:day", verifyChefToken, async (req, res) => {
  const { day } = req.params;
  const { description, photo } = req.body;

  try {
    const updatedMenu = await Menu.findOneAndUpdate(
      { title: day },
      { description, photo },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu for the given day not found" });
    }

    res.status(200).json({ message: "Menu updated successfully", menu: updatedMenu });
  } catch (err) {
    res.status(500).json({ message: "Error updating menu", error: err.message });
  }
});

module.exports = router;

