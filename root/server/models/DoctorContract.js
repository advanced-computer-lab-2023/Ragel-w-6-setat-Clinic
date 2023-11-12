import mongoose from "mongoose";

const Schema = mongoose.Schema;

const doctorContractSchema = new Schema({
  doctorId: {
    type: String,
    ref: "Doctor",
    required: true
  },
  startDate: {
    type: Date,
    default: function () {
      const today = new Date();
      today.setMonth(today.getMonth() + 2); // Set the start date to 2 months from today
      return today;
    },
    required: true
  },
  endDate: {
    type: Date,
    default: function () {
      const startDate = this.startDate || new Date();
      const endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 5); // Set the end date to 5 years from the start date
      return endDate;
    },
    required: true
  },
  markup: {
    type: Number,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  termsAndConditions: {
    type: String
  },
  noticePeriod: {
    type: String
  },
  benefits: {
    type: String
  },
  workingHours: {
    type: String
  },
  overtimePolicy: {
    type: String
  },
  leavePolicy: {
    type: String
  },
  renewalTerms: {
    type: String
  },
  terminationClause: {
    type: String
  },
  nonDisclosureAgreement: {
    type: Boolean,
    default: false
  },
  nonCompeteClause: {
    type: Boolean,
    default: false
  },
  governingLaw: {
    type: String
  }
});

const DoctorContract = mongoose.model("DoctorContract", doctorContractSchema);

export default DoctorContract;
