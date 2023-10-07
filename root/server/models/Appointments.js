import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  Doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  Date: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  Type: {
    type: String,
    required: false,
  },
  Status: {
    type: String,
    required: true,
    enum: ["upcoming", "completed", "cancelled", "rescheduled"],
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
