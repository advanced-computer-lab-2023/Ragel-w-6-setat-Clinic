import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pharmSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    ID: {
      type: String,
      required: true,
    },
    workingLicense: {
      type: String,
      required: true,
    },
    pharmacyDegree: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Pharmacist = mongoose.model("Pharmacist", pharmSchema);
export default Pharmacist;
