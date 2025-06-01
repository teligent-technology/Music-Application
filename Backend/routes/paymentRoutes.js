// routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
require("dotenv").config();

// ✅ Initialize Razorpay with credentials from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🎯 POST /api/payment/create-order
// Creates a ₹1 payment order and returns it to frontend
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 100,             // ₹1 = 100 paise
      currency: "INR",
      receipt: "receipt_order_001", // Can be dynamic if needed
    };

    const order = await razorpay.orders.create(options);

    // ✅ Send back order details to client
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay Order Creation Failed:", err);
    res.status(500).json({
      error: "Failed to create Razorpay order",
      details: err,
    });
  }
});

module.exports = router;
