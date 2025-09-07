import mongoose from 'mongoose';
import Flight from './models/Flight.js';
import dotenv from 'dotenv';

dotenv.config();

  const flights = [
  // Dhaka ↔ Chittagong
  {
    airline: "Biman Bangladesh Airlines",
    flightNumber: "BG101",
    departure: "Dhaka",
    arrival: "Chittagong",
    departureTime: "08:00",
    arrivalTime: "09:00",
    date: "2025-09-10",
    price: 3500,
    nonstop: true,
  },
  {
    airline: "US-Bangla Airlines",
    flightNumber: "UB111",
    departure: "Dhaka",
    arrival: "Chittagong",
    departureTime: "16:00",
    arrivalTime: "17:00",
    date: "2025-09-11",
    price: 3600,
    nonstop: true,
  },
  {
    airline: "Novoair",
    flightNumber: "NV121",
    departure: "Chittagong",
    arrival: "Dhaka",
    departureTime: "18:00",
    arrivalTime: "19:00",
    date: "2025-09-12",
    price: 3400,
    nonstop: true,
  },

  // Dhaka ↔ Sylhet
  {
    airline: "US-Bangla Airlines",
    flightNumber: "UB202",
    departure: "Dhaka",
    arrival: "Sylhet",
    departureTime: "09:30",
    arrivalTime: "10:15",
    date: "2025-09-10",
    price: 3200,
    nonstop: true,
  },
  {
    airline: "Novoair",
    flightNumber: "NV205",
    departure: "Sylhet",
    arrival: "Dhaka",
    departureTime: "14:00",
    arrivalTime: "14:45",
    date: "2025-09-11",
    price: 3100,
    nonstop: true,
  },

  // Dhaka ↔ Cox’s Bazar
  {
    airline: "Novoair",
    flightNumber: "NV303",
    departure: "Dhaka",
    arrival: "Cox’s Bazar",
    departureTime: "11:00",
    arrivalTime: "12:00",
    date: "2025-09-10",
    price: 4500,
    nonstop: true,
  },
  {
    airline: "Biman Bangladesh Airlines",
    flightNumber: "BG311",
    departure: "Dhaka",
    arrival: "Cox’s Bazar",
    departureTime: "07:00",
    arrivalTime: "08:00",
    date: "2025-09-11",
    price: 4600,
    nonstop: true,
  },
  {
    airline: "US-Bangla Airlines",
    flightNumber: "UB304",
    departure: "Cox’s Bazar",
    arrival: "Dhaka",
    departureTime: "15:00",
    arrivalTime: "16:00",
    date: "2025-09-12",
    price: 4400,
    nonstop: true,
  },

  // Chittagong ↔ Cox’s Bazar
  {
    airline: "US-Bangla Airlines",
    flightNumber: "UB204",
    departure: "Chittagong",
    arrival: "Cox’s Bazar",
    departureTime: "14:00",
    arrivalTime: "14:40",
    date: "2025-09-10",
    price: 2800,
    nonstop: true,
  },
  {
    airline: "Novoair",
    flightNumber: "NV211",
    departure: "Cox’s Bazar",
    arrival: "Chittagong",
    departureTime: "17:30",
    arrivalTime: "18:15",
    date: "2025-09-11",
    price: 2900,
    nonstop: true,
  },
];

const seedFlights = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Remove old flights
    await Flight.deleteMany({});

    // Insert new flights
    await Flight.insertMany(flights);

    console.log('Flights seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedFlights();
