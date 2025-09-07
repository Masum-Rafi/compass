import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true }, // changed from "name"
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true }, // new field
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
