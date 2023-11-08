import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  name: {
    type: String,
    required: true,
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
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
