import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "general",
  },
  status: {
    type: String,
    required: true,
    default: "available",
    enum: ["available", "upcoming", "completed", "cancelled", "rescheduled"],
  },
  price: {
    type: Number,
    required: true,
  },
  acceptance: {
    type: String,
    default: "accepted",
    enum: ["pending", "accepted", "rejected"],
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
