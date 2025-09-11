import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Create Booking
router.post("/", protect, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

// 🔹 Get My Bookings
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("flight", "flightNumber departure arrival date")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
});

// 🔹 Admin: Get All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .populate("flight", "departure arrival");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Admin: Update Booking Status
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status || booking.status;
    await booking.save();

    res.json({ message: "Booking updated", status: booking.status });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

export default router;
