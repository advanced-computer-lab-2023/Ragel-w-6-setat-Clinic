import mongoose from "mongoose";
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
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
  },
});

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
    type: [familyMemberSchema],
    default: [],
  },
  medicalHistory: {
    type: Array,
    default: [
      "https://assets-global.website-files.com/651a053c342015fefc668f61/651a053d342015fefc66e09a_Personal%20Health%20Record%20Example%20(Sample).png",
    ],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  subscribedPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    default: null,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
