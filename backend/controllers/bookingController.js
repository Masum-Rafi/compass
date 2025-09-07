import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, userId: req.user.id });
  res.json({ message: "Flight booked", booking });
};

export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(bookings);
};
