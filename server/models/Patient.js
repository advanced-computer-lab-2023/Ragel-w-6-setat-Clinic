import mongoose from "mongoose";
const Schema = mongoose.Schema;

const healthRecordSchema = new Schema({
  uploadByID: {
    type: String,
    required: true,
  },
  uploadByType: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor"],
  },
  name: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  forWhomID: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
});

const familyMemberSchema = new Schema({
  email: {
    type: String,
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

const subscribedPackageSchema = new Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
  packageName: {
    type: String,
    required: true,
  },
  subscriptionStatus: {
    type: String,
    enum: ["subscribed", "unsubscribed", "cancelled"],
  },
  renewalDate: {
    type: Date,
    required: false,
  },
  cancellationDate: {
    type: Date,
    required: false,
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
  nationalID: {
    type: String,
    required: true,
    unique: true,
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
    type: [healthRecordSchema],
    default: [],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  subscribedPackage: {
    type: subscribedPackageSchema,
    default: null,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
