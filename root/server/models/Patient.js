import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  phoneNum: {
    type: String,
    required: true,
  },
  emergencyContact: {
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
  familyMembers: {
    type: [
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
    default: [],
  },
  medicalHistory: {
    type: Array,
    default: [],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  subscribedPackage: {
    type: String,
    required: false,
  }
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
