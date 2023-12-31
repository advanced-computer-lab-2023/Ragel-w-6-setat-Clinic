import mongoose from "mongoose";
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
    unique: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  sessionPrice: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  documentID: {
    type: String,
    required: true,
  },
  medicalLicense: {
    type: String,
    required: true,
  },
  medicalDegree: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
