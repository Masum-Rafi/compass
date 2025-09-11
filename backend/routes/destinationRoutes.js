import { Router } from "express";
import Destination from "../models/Destination.js";

const router = Router();

// 🔹 Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get single destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Create new destination
router.post("/", async (req, res) => {
  try {
    const { name, country, description, image } = req.body;
    const newDest = new Destination({ name, country, description, image });
    await newDest.save();
    res.status(201).json(newDest);
  } catch (err) {
    res.status(500).json({ message: "Creation failed", error: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!dest)
      return res.status(404).json({ message: "Destination not found" });
    res.json(dest);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE destination
router.delete("/:id", async (req, res) => {
  try {
    const dest = await Destination.findByIdAndDelete(req.params.id);
    if (!dest)
      return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
