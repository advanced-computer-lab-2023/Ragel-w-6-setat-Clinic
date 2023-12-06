import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check Doctor database
    const doctor = await Doctor.findOne({ username, password }).exec();
    if (doctor) {
      return res.status(200).json({
        userType: "doctor",
        user: doctor,
      });
    }

    // Check Patient database
    const patient = await Patient.findOne({ username, password }).exec();
    if (patient) {
      return res.status(200).json({ userType: "patient", user: patient });
    }

    // Check Admin database
    const admin = await Admin.findOne({ username, password }).exec();
    if (admin) {
      return res.status(200).json({ userType: "admin", user: admin });
    }

    // If no user is found
    return res.status(500).json({ message: "Invalid credentials" });
  } catch (error) {
    // Handle any errors
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login };
