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
    required: false,
  },
  status: {
    type: String,
    required: false,
    enum: ["upcoming", "completed", "cancelled", "rescheduled"],
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
