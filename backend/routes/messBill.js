const express = require("express");
const router = express.Router();
const studentAuth = require("../middlewares/student");
const MessBill = require("../models/MessBill");

// ✅ Route to view mess bill status
router.get("/status", studentAuth, async (req, res) => {
  try {
    const bill = await MessBill.findOne({ student: req.student.id });

    if (!bill) {
      return res.status(404).json({ message: "Mess bill not found" });
    }

    res.status(200).json({ bill });
  } catch (error) {
    console.error("Error fetching mess bill:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route to make payment (simulated as marking isPaid = true)
router.post("/pay", studentAuth, async (req, res) => {
  try {
    const bill = await MessBill.findOne({ student: req.student.id });

    if (!bill) {
      return res.status(404).json({ message: "Mess bill not found" });
    }

    if (bill.isPaid) {
      return res.status(400).json({ message: "Mess bill already paid" });
    }

    bill.isPaid = true;
    bill.paymentDate = new Date();
    await bill.save();

    res.status(200).json({ message: "Payment successful", bill });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
