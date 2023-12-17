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
  medication: [
    {
      medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  isFilled: {
    type: Boolean,
    default: false,
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
