import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
});

const medSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    activeIngredient: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    medicinalUse: {
      type: String,
      required: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    overTheCounter: {
      type: Boolean,
      //required: true
    },
    archived: {
      type: Boolean,
      default: false,
    },
    outOfStock: {
      type: Boolean,
      required: true,
    },

    sales: [saleSchema],
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medSchema);
export default Medicine;
