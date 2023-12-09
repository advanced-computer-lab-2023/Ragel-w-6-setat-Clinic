import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check Doctor database
    const doctor = await Doctor.findOne({ username, password }).exec();
    if (doctor) {
      const token = createToken(doctor.username);
      return res.status(200).json({
        userType: "doctor",
        user: doctor,
        token,
      });
    }

    // Check Patient database
    const patient = await Patient.findOne({ username, password }).exec();
    if (patient) {
      const token = createToken(patient.username);
      return res
        .status(200)
        .json({ userType: "patient", user: patient, token });
    }

    // Check Admin database
    const admin = await Admin.findOne({ username, password }).exec();
    if (admin) {
      const token = createToken(admin.username);
      return res.status(200).json({ userType: "admin", user: admin, token });
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
