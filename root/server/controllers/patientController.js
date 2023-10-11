import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";

// create (register) a patient

// make a get request to view every patients username and password
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}, "username password"); // Retrieve only username and password fields
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const renderHomePage = function (req, res) {
  res.render("patientHome");
};

const renderRegisterationPage = function (req, res) {
  res.render("patientRegister");
};

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      username: req.body.username,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phoneNum: req.body.phoneNum,
      emergencyContact: {
        phoneNum: req.body.emergencyMobile,
        fName: req.body.emergencyFName,
        lName: req.body.emergencyLName,
      },
    });
    res.render("login", {
      registeredSuccessfully: true,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const viewPrescription = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Find all the prescriptions for the patient
    const prescriptions = await Prescription.find({ patient: patientId });

    res.status(200).json({
      status: "success",
      data: {
        prescriptions: prescriptions,
      },
    });
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  createPatient,
  viewPrescription,
  getAllPatients,
  renderHomePage,
  renderRegisterationPage,
};
