import mongoose from "mongoose";
const Schema = mongoose.Schema;

const creditcardSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  securityCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const CreditCard = mongoose.model("CreditCard", creditcardSchema);
export default CreditCard;
