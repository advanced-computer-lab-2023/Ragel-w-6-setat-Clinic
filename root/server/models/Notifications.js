import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  Title: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
