import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: "" },   // URL for now
    desc: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
