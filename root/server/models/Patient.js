import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

  linked: {
type: Boolean,
default: false,
  }
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
    type: Array,
    default: [],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  subscribedPackage: {
    type: subscribedPackageSchema,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
