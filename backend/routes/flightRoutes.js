import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

// 🔹 Search flights
router.get("/search", async (req, res) => {
  try {
    const { departure, arrival, date, nonstop } = req.query;

    let query = { departure, arrival };

    if (nonstop) query.nonstop = nonstop === "true";

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = { $gte: start, $lte: end };
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get all flights (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get single flight
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update flight status
router.put("/:id", async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
