import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";

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

// LOJAINS REQS

const addFamMem = async (req, res) => {
  const patientId = req.params.id;
  const { fName, lName, nationalID, gender, dateOfBirth, relationship } =
    req.body;
  const validRelationships = ["wife", "husband", "son", "daughter"];

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Check if the relationship is valid (wife, husband, or children)
    if (!validRelationships.includes(req.body.relationship)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid relationship. Allowed values are wife, husband, or children.",
      });
    }

    // Check if the nationalID of the new family member already exists
    const isDuplicate = patient.familyMembers.some(
      (member) => member.nationalID === nationalID
    );
    if (isDuplicate) {
      return res.status(400).json({
        status: "fail",
        message: "National ID already exists for a family member",
      });
    }

    // Add the new family member to the patient's familyMembers array
    const newFamilyMember = {
      fName: fName,
      lName: lName,
      nationalID: nationalID,
      gender: gender,
      dateOfBirth: dateOfBirth,
      relationship: relationship,
    };

    patient.familyMembers.push(newFamilyMember);
    await patient.save();

    res.status(201).json({
      status: "success",
      data: {
        patient: patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
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

const filterThePrescription = async (req, res) => {
  const patientId = req.params.id;
  try {
    const filter = {};

    if (req.body.doctor) {
      filter.doctor = req.body.doctor;
    }

    if (req.body.date) {
      filter.date = req.body.date;
    }

    if (req.body.isFilled) {
      filter.isFilled = req.body.isFilled;
    }

    if (req.params.id) {
      filter.patient = req.params.id;
    }
    const patient = await Patient.findById(patientId);
    console.log(
      "IS " + req.body.date + req.body.doctor + req.body.isFilled + patientId
    );
    const prescription = await Prescription.find(filter);

    res.status(200).json({
      status: "success",
      data: {
        prescription: prescription,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const selectPrescription = async (req, res) => {
  const prescriptionId = req.body.id;
  const patiendID = req.params.id;

  try {
    const prescription = await Prescription.find({
      _id: prescriptionId,
      patient: patiendID,
    });

    if (!prescription) {
      return res.status(404).json({
        status: "fail",
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        prescription: prescription,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// MARIAMS REQS

const searchForDoctor = async (req, res) => {
  const { name, specialty } = req.query;
  const patientID = req.params.id;
  try {
    const query = {};
    if (name) {
      query.$or = [
        { fName: { $regex: new RegExp(name, "i") } },
        { lName: { $regex: new RegExp(name, "i") } },
      ];
    }
    if (specialty) {
      query.specialty = { $regex: new RegExp(specialty, "i") };
    }
    const doctors = await Doctor.find(query);
    console.log(doctors);
    if (doctors.length === 0) {
      res.status(404).json({ error: "Doctors not found" });
    } else {
      res.status(200).json(doctors);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterDoctors = async (req, res) => {
  try {
    const specialty = req.body.specialty;
    const patientId = req.params.id;
    const date = req.body.date;
    const appointmentsByDate = await Appointments.find({
      date: date,
      isAvailable: true,
    });
    const filter = {};
    const doctorIDS = [];

    appointmentsByDate.forEach((appointment) => {
      if (appointment.isAvailable === true) {
        doctorIDS.push(appointment.doctor);
      }
    });
    if (specialty) {
      filter.specialty = specialty;
    }

    if (doctorIDS.length > 0) {
      filter._id = { $in: doctorIDS };
    }

    try {
      const doctors = await Doctor.find(filter).exec();
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterAvailableAppointments = async (req, res) => {
  const { status, date } = req.query;
  //const patientID = req.params.id;
  try {
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.date = new Date(date);
    }
    const appointments = await Appointments.find(filter);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterMyAppointments = async (req, res) => {
  const patientId = req.params.id; // Get patientId from URL parameter

  try {
    const filter = {};

    if (req.query.date) {
      filter.date = req.queryq.date;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    filter.patient = req.params.id;

    const appointments = await Appointments.find(filter);

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const selectDoctor = async (req, res) => {
  const patientID = req.params.id;
  const doctorUsername = req.query.username;
  try {
    const doctor = await Doctor.find({ username: doctorUsername });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// SARAS REQS

const getFamilyMembers = async (req, res) => {
  try {
    const patientID = req.params.id; // Get patient's email from the request body

    // Find the patient using the provided email in the familyMembers array
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res
        .status(404)
        .json({ message: "There are no Family Members registered" });
    }

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers;

    res.render("viewFamily.ejs", {
      userID: patientID,
      patientFamily: familyMembers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);
    const patientPackage = patient.subscribedPackage;

    let sessionDiscount = 0;
    if (patientPackage) {
      const packageOffered = await Package.findOne({ name: patientPackage });
      if (packageOffered) {
        sessionDiscount = packageOffered.sessionDiscount || 0;
      }
    }

    const doctors = await Doctor.find().lean();

    const doctorsDisplay = doctors.map((doctor) => {
      const originalSessionPrice = doctor.sessionPrice;
      const discountedPrice =
        originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
      return {
        name: doctor.fName + " " + doctor.lName,
        specialty: doctor.specialty,
        sessionPrice: discountedPrice,
      };
    });

    res.render("allDoctors", { userID: patientID, doctors: doctorsDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSingleDoctor = async (req, res) => {
  try {
    const doctorID = req.body.id;
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);
    const patientPackage = patient.subscribedPackage;

    let sessionDiscount = 0;
    if (patientPackage) {
      const packageOffered = await Package.findOne({ name: patientPackage });
      if (packageOffered) {
        sessionDiscount = packageOffered.sessionDiscount || 0;
      }
    }
    const doctor = await Doctor.findById(doctorID);
    const originalSessionPrice = doctor.sessionPrice;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    const modifiedDoctor = {
      ...doctor.toObject(), // Convert Mongoose document to plain JavaScript object
      sessionPrice: discountedPrice, // Replace sessionPrice with discountedPrice
    };

    res.json(modifiedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createPatient,
  viewPrescription,
  getAllPatients,
  renderHomePage,
  renderRegisterationPage,
  addFamMem,
  filterThePrescription,
  selectPrescription,
  filterDoctors,
  searchForDoctor,
  filterMyAppointments,
  filterAvailableAppointments,
  selectDoctor,
  getFamilyMembers,
  getAllDoctors,
  getSingleDoctor,
};
