import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
  Gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  PhoneNum: {
    type: String,
    required: true,
  },
  EmergencyContact: {
    phoneNum: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
  },
  FamilyMembers: [
    {
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
      nationalID: {
        type: String,
        required: true,
        unique: true,
      },
      gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
        enum: ["father", "mother", "brother", "sister", "son", "daughter"],
      },
    },
  ],
  MedicalHistory: {
    type: Array,
    default: [],
  },
  Wallet: {
    type: Number,
    default: 0,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
