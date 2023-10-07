import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  Doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  Medication: {
    type: String,
    required: true,
  },
  Dosage: {
    type: String,
    required: true,
  },
  IsFilled: {
    type: boolean,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Notes: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
