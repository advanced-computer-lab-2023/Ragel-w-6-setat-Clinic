import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import PatientPharmacy from "../models/PatientPharmacy.js";
import Pharmacist from "../models/Pharmacist.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check Doctor database
    const doctor = await Doctor.findOne({ username, password }).exec();
    if (doctor && doctor.isRegistered) {
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

const registerPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      username: req.body.patientFields.username,
    });
    const doctor2 = await Doctor.findOne({
      email: req.body.patientFields.email,
    });
    const admin = await Admin.findOne({
      username: req.body.patientFields.username,
    });
    const pharmacist = await Pharmacist.findOne({
      username: req.body.patientFields.username,
    });
    const pharmacist2 = await Pharmacist.findOne({
      email: req.body.patientFields.email,
    });
    const patientPharmacy2 = await PatientPharmacy.findOne({
      username: req.body.patientFields.username,
    });
    const patientPharmacy3 = await PatientPharmacy.findOne({
      email: req.body.patientFields.email,
    });

    if (doctor || admin || pharmacist || patientPharmacy2) {
      return res
        .status(500)
        .json({ message: "A user already exists with this username" });
    }

    if (doctor2 || pharmacist2 || patientPharmacy3) {
      return res
        .status(500)
        .json({ message: "A user already exists with this email" });
    }

    const {
      fName,
      lName,
      username,
      email,
      dateOfBirth,
      gender,
      phoneNum,
      password,
    } = req.body.patientFields;

    const patient = await Patient.create({
      ...req.body.patientFields,
      emergencyContact: {
        ...req.body.emergencyContact,
      },
    });

    const patientPharmacy = await PatientPharmacy.create({
      name: `${fName} ${lName}`,
      username,
      email,
      dateOfBirth,
      gender,
      mobileNumber: phoneNum,
      emergencyContact: {
        name: `${req.body.emergencyContact.fName} ${req.body.emergencyContact.lName}`,
        mobileNumber: req.body.emergencyContact.phoneNum,
        relationTo: "family Member",
      },
      password,
      addresses: [],
      payment: {
        method: "cashOnDelivery",
        walletBalance: 0,
      },
      orders: [],
    });

    const role = "patient";
    const user = await User.create({ username, password, role });

    res.status(201).json({
      status: "success",
      message: "Patient successfully registered.",
    });
  } catch (error) {
    console.error("Patient registration error:", error);
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      const message = `A user already exists with this ${duplicatedField}`;
      res.status(500).json({ message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const registerDoctor = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fName,
      lName,
      dateOfBirth,
      educationalBackground,
      hourlyRate,
      sessionPrice,
      affiliation,
      specialty,
    } = JSON.parse(req.body.requestData).doctorFields;
    // Access file buffers from req.files
    const documentID = req.files.fileID[0].filename;
    const medicalLicense = req.files.fileMedicalLicense[0].filename;
    const medicalDegree = req.files.fileMedicalDegree[0].filename;

    const patient = await Patient.findOne({ username });
    const patient2 = await Patient.findOne({ email });
    const admin = await Admin.findOne({ username });

    if (patient || admin) {
      return res
        .status(500)
        .json({ message: "A user already exists with this username" });
    }

    if (patient2) {
      return res
        .status(500)
        .json({ message: "A user already exists with this email" });
    }

    const newDoctor = new Doctor({
      username,
      password,
      email,
      fName,
      lName,
      dateOfBirth,
      educationalBackground,
      hourlyRate,
      sessionPrice,
      affiliation,
      specialty,
      documentID,
      medicalLicense,
      medicalDegree,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Doctor registration error:", error);
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      const message = `A user already exists with this ${duplicatedField}`;
      res.status(500).json({ message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const sendPasswordResetEmail = async (email, newPassword) => {
  const mailOptions = {
    from: "3projectalpha3@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Your password has been reset. Your new password is: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "3projectalpha3@gmail.com",
    pass: "ncgo dehg lebs zazh",
  },
});

const resetPasswordOTP = async (req, res) => {
  try {
    const { username, email } = req.body; //CHECKME sends random otp
    const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "*";

    const getRandomChar = (charSet) => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
    };

    const password =
      getRandomChar(capitalLetters) +
      getRandomChar(numbers) +
      Array.from({ length: 6 }, () =>
        getRandomChar(capitalLetters + numbers + specialCharacters)
      ).join("");

    // Check Doctor database
    const doctor = await Doctor.findOne({ username, email });
    if (doctor) {
      doctor.password = password;
      await doctor.save();

      await sendPasswordResetEmail(email, password);
      return res.json({ success: true });
    }

    // Check Patient database
    const patient = await Patient.findOne({ username, email });
    if (patient) {
      patient.password = password;
      await patient.save();

      await sendPasswordResetEmail(email, password);
      return res.json({ success: true });
    }

    // Check Admin database
    const admin = await Admin.findOne({ username, email }).exec();
    if (admin) {
      admin.password = password;
      const check = admin.password;

      await sendPasswordResetEmail(email, password);
      await admin.save();
      return res.json({ success: true });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials; does not exist in Patient/Admin/doctor",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { login, registerPatient, registerDoctor, resetPasswordOTP };
