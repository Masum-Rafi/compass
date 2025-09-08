// backend/routes/bookingRoutes.js
import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js"; // ⬅️ JWT auth

const router = express.Router();

// Create Booking
router.post("/", protect, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id, // ← fixed
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error); // log full error
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

// Get All Bookings for Logged-in User
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }) // ← fixed
      .populate("flight", "flightNumber origin destination date")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});


export default router;
