import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Make sure usernames are unique
  },
  email: {
    type: String,
    default: null,
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        // Define your custom validation logic here
        // For example, require at least 8 characters, one uppercase letter, and one digit
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(password);
      },
      message:
        "Password must be at least 8 characters long and contain an uppercase letter and a digit.",
    },
  },
  role: {
    type: String,
    enum: ["admin", "pharmacist", "patient"],
    default: "patient",
  },
  registrationStatus: {
    type: String,
    enum: ["pending", "approved"],
    default: "approved", // Set a default status as 'approved'
  },
});

const User = mongoose.model("User", userSchema);
export default User;
