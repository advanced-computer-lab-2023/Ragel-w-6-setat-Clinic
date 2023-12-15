import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointments from "../models/Appointments.js";
import Admin from "../models/Admin.js";
import Prescription from "../models/Prescription.js";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

// HABIBAS REQS

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

const getAllDoctors = async (req, res) => {
  async (req, res) => {
    try {
      const doctors = await Doctor.find({}, "username password"); // Retrieve only username and password fields
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

const doctorDetails = async function (req, res) {
  const doctorid = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorid).select([
      "username",
      "email",
      "fName",
      "lName",
      "educationalBackground",
      "hourlyRate",
      "affiliation",
      "specialty",
    ]);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Doctor successfully registered.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const scheduleFollowUp = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;

  try {
    const patient = await Patient.findById(patientId);

    const appointment = await Appointments.create({
      patient: patient._id,
      doctor: doctorId,
      date: req.body.date,
      isAvailable: false,
      type: "follow-up",
      status: "upcoming",
      price: req.body.price,
    });

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Fill the options please" });
  }
};

const getWalletAmount = async (req, res) => {
  const doctorId = req.params.id;

  try {
    // Find the doctor by ID and select the 'wallet' field
    const doctor = await Doctor.findById(doctorId).select("wallet").exec();
    // Return the wallet amount
    res.status(200).json(doctor.wallet);
  } catch (err) {
    console.error("Error retrieving wallet amount:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const uploadDocumentForPatient = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;
  try {
    const patient = await Patient.findById(patientId);
    const newHealthRecord = {
      uploadByID: doctorId,
      uploadByType: "Doctor",
      name: req.file.originalname,
      filePath: req.file.filename,
      forWhomID: patientId,
      fileType: req.file.mimetype,
    };

    patient.medicalHistory.push(newHealthRecord);
    const medicalHistory = patient.medicalHistory;
    await patient.save();
    res.status(200).json({
      medicalHistory: medicalHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMedicalHistoryForPatient = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;
  try {
    const patient = await Patient.findById(patientId);
    res.status(200).json({ medicalHistory: patient.medicalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// MARIAMS REQS

const searchForPatient = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const filter = {};
    if (req.query.fName != "") {
      filter.fName = req.query.fName;
    }
    if (req.query.lName != "") {
      filter.lName = req.query.lName;
    }

    const appointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");
    const doctorPatients = [];

    for (const appointment of appointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;

        const patient = await Patient.findById(patientId).exec();
        const isPatientExists = doctorPatients.some((docPatient) =>
          docPatient._id.equals(patient._id)
        );
        if (!isPatientExists) {
          doctorPatients.push(patient);
        }
      }
    }
    const filteredPatients = doctorPatients.filter((patient) => {
      const isFNameMatch =
        !filter.fName ||
        patient.fName.toLowerCase().includes(filter.fName.toLowerCase());
      const isLNameMatch =
        !filter.lName ||
        patient.lName.toLowerCase().includes(filter.lName.toLowerCase());

      return isFNameMatch && isLNameMatch;
    });

    res.status(200).json(filteredPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const filterMyAppointments = async (req, res) => {
  const doctorId = req.params.id; // Get doctotId from URL parameter

  try {
    const filter = {};

    if (req.query.date) {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    filter.doctor = req.params.id;

    const appointments = await Appointments.find(filter).populate("patient");
    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");
    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const upcomingAppointments = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const upcomingAppointments = await Appointments.find({
      doctor: doctorId,
      status: "upcoming",
      //  date: { $gte: new Date() }, // Filter for appointments with dates in the future
    }).populate("patient");
    const doctorPatientsWithUpcomingAppointments = [];

    for (const appointment of upcomingAppointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;

        const patient = await Patient.findById(patientId).exec();
        const isPatientExists = doctorPatientsWithUpcomingAppointments.some(
          (docPatient) => docPatient._id.equals(patient._id)
        );
        if (!isPatientExists) {
          doctorPatientsWithUpcomingAppointments.push(patient);
        }
      }
    }
    res.status(200).json(doctorPatientsWithUpcomingAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SARAS REQS

const getMyPatients = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointments.find({ doctor: doctorId }).populate(
      "patient"
    );
    const doctorPatients = [];

    for (const appointment of appointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;

        const patient = await Patient.findById(patientId).exec();
        const isPatientExists = doctorPatients.some((docPatient) =>
          docPatient._id.equals(patient._id)
        );
        if (!isPatientExists) {
          doctorPatients.push(patient);
        }
      }
    }

    res.status(200).json(doctorPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSinglePatient = async (req, res) => {
  const doctorID = req.params.doctorid;
  const patientID = req.params.patientid;
  try {
    // const appointment = await Appointments.findOne({
    //   doctor: doctorID,
    //   patient: patientID,
    // }).populate("patient");
    // if (!appointment) {
    //   return res.status(404).json({ message: "Patient not found" });
    // }

    const patient = await Patient.findById(patientID);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOJAINS REQS

const viewUpcomingAppointments = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const appointments = await Appointments.find({
      doctor: doctorId,
      status: "upcoming",
    }).populate("patient");

    res.json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const viewPastAppointments = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const appointments = await Appointments.find({
      doctor: doctorId,
      status: "completed",
    }).populate("patient");

    res.json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// Doctor can create new available appointments sprint #2
const addAvailableAppointments = async (req, res) => {
  try {
    const { date, price } = req.query; // Extract date and type from the request body
    const doctorId = req.params.id; // Assuming you have the doctorId in the route parameters
    const doctor = await Doctor.findById(doctorId);

    // Create a new appointment
    const appointment = new Appointments({
      doctor: doctorId,
      patient: null,
      date,
      isAvailable: true,
      price,
      status: "available",
    });

    // Save the appointment to the database
    await appointment.save();

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create appointment",
    });
  }
};

// sprint 3
const viewAllPrescription = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;

  try {
    const prescriptions = await Prescription.find({
      doctor: doctorId,
      patient: patientId,
    }).populate("patient doctor");

    res.status(200).json({
      status: "success",
      prescriptions: prescriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const downloadPrescriptionPDF = async (req, res) => {
  try {
    const prescriptionId = req.params.prescriptionid;

    // Check if the prescription exists
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Prescription_${prescriptionId}.pdf`
    );

    // Pipe the PDF to the response stream
    doc.pipe(res);

    // Add prescription data to the PDF
    doc.fontSize(12).text("Medication:");
    prescription.medication.forEach((med) => {
      doc
        .fontSize(12)
        .text(
          `- Name: ${med.name}, Dosage: ${med.dosage}, Price: ${med.price} EGP`
        );
    });
    doc.fontSize(12).text(`Notes: ${prescription.notes}`);
    doc.fontSize(12).text(`Date: ${prescription.date}`);
    doc.fontSize(12).text(`Is Filled: ${prescription.isFilled ? "Yes" : "No"}`);

    // End the PDF creation
    doc.end();

    // You can save the PDF to a file if needed
    // doc.pipe(fs.createWriteStream(`Prescription_${prescriptionId}.pdf`));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const filterThePrescription = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;
  try {
    const filter = {};

    if (req.query.date != "") {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }
    if (req.query.isFilled != "") {
      filter.isFilled = req.query.isFilled;
    }

    filter.doctor = doctorId;
    filter.patient = patientId;

    const prescriptions = await Prescription.find(filter).populate(
      "patient doctor"
    );

    res.status(200).json({
      status: "success",
      prescriptions: prescriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const selectPrescription = async (req, res) => {
  const prescriptionId = req.params.prescriptionid;
  const doctorId = req.params.doctorid;

  try {
    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      doctor: doctorId,
    }).populate("patient doctor");

    if (!prescription) {
      return res.status(404).json({
        status: "fail",
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      status: "success",
      prescription: prescription,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  doctorDetails,
  searchForPatient,
  filterMyAppointments,
  upcomingAppointments,
  getMyPatients,
  getSinglePatient,
  getMyAppointments,
  scheduleFollowUp,
  getWalletAmount,
  viewUpcomingAppointments,
  viewPastAppointments,
  addAvailableAppointments,
  uploadDocumentForPatient,
  getMedicalHistoryForPatient,
  registerDoctor,
  viewAllPrescription,
  downloadPrescriptionPDF,
  filterThePrescription,
  selectPrescription,
};
