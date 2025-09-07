import Destination from "../models/Destination.js";

export const listDestinations = async (req, res) => {
  const data = await Destination.find().sort({ createdAt: -1 });
  res.json(data);
};

export const createDestination = async (req, res) => {
  const { name, img, desc } = req.body;
  const dest = await Destination.create({ name, img, desc });
  res.json(dest);
};
