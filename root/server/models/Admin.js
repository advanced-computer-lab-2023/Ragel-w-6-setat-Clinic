import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
