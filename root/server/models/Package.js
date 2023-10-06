import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  Name: {
    type: String,
    required: true,
    enum: ["Silver", "Gold", "Platinum"],
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  SessionDiscount: {
    type: Number,
    required: true,
  },
  MedicineDiscount: {
    type: Number,
    required: true,
  },
  SubscriptionDiscount: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    default: "Unsubscribed",
  },
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
