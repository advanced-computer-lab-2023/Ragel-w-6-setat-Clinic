import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Silver", "Gold", "Platinum"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sessionDiscount: {
    type: Number,
    required: true,
  },
  medicineDiscount: {
    type: Number,
    required: true,
  },
  subscriptionDiscount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Unsubscribed",
  },
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
