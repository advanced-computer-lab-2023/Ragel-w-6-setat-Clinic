import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: Number,
    required: true,
  },
  apartmentNumber: {
    type: Number,
  },
});

const paymentSchema = new Schema({
  method: {
    type: String,
    enum: ["wallet", "creditCard", "cashOnDelivery"],
    default: "cashOnDelivery",
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
});

const emergencyContactSchema = new Schema({
  _id: false, // Prevents emergencyContact from having its own _id field
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  relationTo: {
    type: String,
    required: true,
  },
});

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    addresses: [addressSchema],
    payment: paymentSchema,
    emergencyContact: {
      type: emergencyContactSchema,
      required: true,
    },
    cart: {
      items: [
        {
          medicineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine",
          },
          quantity: {
            type: Number,
            default: 1,
          },
          price: {
            type: Number,
            default: 0,
          },
          name: {
            type: String,
          },
        },
      ],
      totalQty: {
        type: Number,
        default: 0,
        // required: true,
      },
      totalCost: {
        type: Number,
        default: 0,
        //required: true,
      },
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        //required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    orders: [
      {
        items: [
          {
            medicineId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Medicine",
            },
            quantity: {
              type: Number,
              default: 1,
            },
            price: {
              type: Number,
              default: 0,
            },
            name: {
              type: String,
            },
          },
        ],
        totalQty: {
          type: Number,
          default: 0,
        },
        totalCost: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const PatientPharmacy = mongoose.model("PatientPharmacy", patientSchema);
export default PatientPharmacy;
