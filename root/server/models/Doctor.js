import mongoose from "mongoose";
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
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
  DateOfBirth: {
    type: Date,
    required: true,
  },
  EducationalBackground: {
    type: String,
    required: true,
  },
  HourlyRate: {
    type: Number,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true,
  },
  Specialty: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
