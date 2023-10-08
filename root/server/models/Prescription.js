import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  medication: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  isFilled: {
    type: boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
