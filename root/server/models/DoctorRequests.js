const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
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
    sessionPrice: {
      type: Number,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

// didnt put documents just in case

module.exports = mongoose.model("Requests", requestSchema);
