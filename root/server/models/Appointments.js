import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
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
    enum: ["available","upcoming", "completed", "cancelled", "rescheduled"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
