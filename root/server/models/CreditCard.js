import mongoose from "mongoose";
const Schema = mongoose.Schema;

const creditcardSchema = new Schema({
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  CardNumber: {
    type: String,
    required: true,
  },
  ExpirationDate: {
    type: Date,
    required: true,
  },
  SecurityCode: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

const CreditCard = mongoose.model("CreditCard", creditcardSchema);
export default CreditCard;
