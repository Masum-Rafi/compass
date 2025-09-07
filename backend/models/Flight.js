import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  departure: String,
  arrival: String,
  departureTime: String,
  arrivalTime: String,
  date: Date,
  price: Number,
  nonstop: Boolean,
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
