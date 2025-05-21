const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");
const verifyChefToken = require("../middlewares/chef");// adjust path as needed
const Chef = require("../models/chef");
const bcrypt = require("bcrypt");


// Get all menu items for chef dashboard
router.get("/menu", verifyChefToken, async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json({ Menu: menus });
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

router.put("/change-password", verifyChefToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    const chef = await Chef.findById(req.chef.id);

    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, chef.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    chef.password = hashedNewPassword;
    await chef.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

