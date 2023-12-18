import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointments from "../models/Appointments.js";
import Admin from "../models/Admin.js";
import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";
import nodemailer from "nodemailer";
import Notification from "../models/Notifications.js";
import PDFDocument from "pdfkit";
import Package from "../models/Package.js";

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
      "wallet",
      "employmentContractAccepted",
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
    const doctor = await Doctor.findById(doctorId);
    const doctorPrice = doctor.sessionPrice;

    const patientPackage = patient.subscribedPackage;

    let sessionDiscount = 0;
    if (patientPackage) {
      const packageOffered = await Package.findById({
        _id: patientPackage.packageId,
      });
      if (packageOffered) {
        sessionDiscount = packageOffered.sessionDiscount || 0;
      }
    }
    const originalSessionPrice = doctorPrice;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);

    const appointmentDate = new Date(req.body.date);

    const localDate = appointmentDate.toLocaleString("en-US", {
      timeZone: "Africa/Cairo", // Replace with your actual time zone
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    const appointment = await Appointments.create({
      patient: patient._id,
      doctor: doctorId,
      date: localDate,
      isAvailable: false,
      price: discountedPrice,
      type: "follow-up",
      status: "upcoming",
      acceptance: "accepted",
    });

    const doctorAppointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");
    res.status(200).json({
      status: "success",
      message: "Appointment created successfully.",
      followUpAppointment: appointment,
      appointments: doctorAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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

//sprint 1
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

//sprint 3
const rescheduleAppointment = async (req, res) => {
  const doctorId = req.params.doctorid;
  const appointmentId = req.params.appointmentid;
  const appointmentDate = new Date(req.body.date);
  const localDate = appointmentDate.toLocaleString("en-US", {
    timeZone: "Africa/Cairo", // Replace with your actual time zone
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  try {
    const appointment = await Appointments.findById({
      _id: appointmentId,
      doctor: doctorId,
    });

    appointment.date = localDate;
    appointment.status = "rescheduled";

    // Save the changes
    await appointment.save();

    const doctorAppointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");

    res.status(200).json({
      status: "success",
      message: "Appointment rescheduled successfully.",
      appointments: doctorAppointments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const cancelAppointmentforPatient = async (req, res) => {
  const doctorId = req.params.doctorid;
  const appointmentId = req.params.appointmentid;

  try {
    const appointment = await Appointments.findById({
      _id: appointmentId,
      doctor: doctorId,
    });

    const patientId = appointment.patient;

    // Update patient's wallet
    await Patient.findOneAndUpdate(
      { _id: patientId },
      { $inc: { wallet: appointment.price } }
    );

    appointment.status = "cancelled";
    await appointment.save();

    const doctorAppointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");

    res.status(200).json({
      status: "success",
      message: "Appointment cancelled.",
      appointments: doctorAppointments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const pendingReq = async (req, res) => {
  const doctorID = req.params.id;
  try {
    const appointments = await Appointments.find({
      doctor: doctorID,
      acceptance: "pending",
    }).populate("patient");

    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const appointmentId = req.params.appointmentid;
  const doctorID = req.params.doctorid;

  try {
    const appointment = await Appointments.findById(appointmentId);

    appointment.appointment.acceptance = "accepted";
    await appointment.save();

    const pendingappointments = await Appointments.find({
      doctor: doctorID,
      acceptance: "pending",
    }).populate("patient");

    res.status(200).json({
      status: "success",
      message: "Appointment acceptaed successfully.",
      updatedAppointment: appointment,
      pendingappointments: pendingappointments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const rejectRequest = async (req, res) => {
  const appointmentId = req.params.appointmentid;
  const doctorID = req.params.doctorid;

  try {
    const doctor = await Doctor.findById(doctorID);
    const appointment = await Appointments.findById(appointmentId);

    appointment.acceptance = "accepted";
    appointment.status = "available";
    appointment.isAvailable = true;
    appointment.patient = null;
    appointment.price = doctor.sessionPrice;
    appointment.type = "general";
    await appointment.save();

    const pendingappointments = await Appointments.find({
      doctor: doctorID,
      acceptance: "pending",
    }).populate("patient");

    res.status(200).json({
      status: "success",
      message: "Appointment rejected successfully.",
      updatedAppointment: appointment,
      pendingappointments: pendingappointments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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

const addAvailableAppointments = async (req, res) => {
  try {
    const { date } = req.query; // Extract date and type from the request body
    const doctorId = req.params.id; // Assuming you have the doctorId in the route parameters
    const doctor = await Doctor.findById(doctorId);

    // Create a new appointment
    const appointment = new Appointments({
      doctor: doctorId,
      patient: null,
      date,
      isAvailable: true,
      price: doctor.sessionPrice,
      status: "available",
    });

    // Save the appointment to the database
    await appointment.save();

    const allDoctorsAppointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");

    res.status(200).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
      appointments: allDoctorsAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "error.message",
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

const createPrescription = async (req, res) => {
  try {
    const { addedMedicines, notes } = req.body;
    const doctorId = req.params.doctorid;
    const patientId = req.params.patientid;

    const medication = addedMedicines.map((med) => {
      return {
        medicineId: med.medicineID,
        name: med.medicineName,
        dosage: med.dosage,
        price: med.medicinePrice,
      };
    });

    // Create a new prescription
    const prescription = new Prescription({
      patient: patientId,
      doctor: doctorId,
      medication,
      date: new Date(),
      notes,
    });

    // Save the prescription
    await prescription.save();

    const prescriptions = await Prescription.find({
      doctor: doctorId,
      patient: patientId,
    }).populate("patient doctor");

    res.status(200).json({ status: "success", prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescriptionId = req.params.prescriptionid;
    const { medication } = req.body;

    const existingPrescription = await Prescription.findById(
      prescriptionId
    ).populate("patient doctor");

    existingPrescription.medication = medication;

    const updatedPrescription = await existingPrescription.save();

    res
      .status(200)
      .json({ status: "success", prescription: updatedPrescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const changeDoctorPassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const doctor = await Doctor.findOne({ username });

    if (oldPassword != doctor.password) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain an uppercase letter and a digit.",
      });
    }

    doctor.password = newPassword;
    await doctor.save();

    // Update the associated user's password
    // const user = await User.findOne({ username });
    // user.password = await bcrypt.hash(newPassword, 10);
    //await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// make a function that changes every doctors read in notification to true
const markAllNotificationsAsRead = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    const notifications = await Notification.find({ doctor: doctorId });

    notifications.forEach((notification) => {
      notification.read = true;
      notification.save();
    });

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getDoctorNotifications = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    const notifications = await Notification.find({ doctor: doctorId })
      .sort({ date: -1 }) // Sort by creation date in descending order
      .limit(15); // Limit the result to 15 notifications

    res.status(200).json({ status: "success", notifications: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAppointmentNotifications = async (req, res) => {
  try {
    const doctorId = req.params.doctorid;
    const appointmentId = req.params.appointmentid;

    const doctor = await Doctor.findById(doctorId);

    const appointment = await Appointments.findById(appointmentId);

    const patient = await Patient.findById(appointment.patient);

    let notificationMessagePatient = "";
    let notificationMessageDoctor = "";
    const appointmentDate = new Date(appointment.date);
    const localDate = appointmentDate.toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const doctorName = `${doctor.fName} ${doctor.lName}`;
    const patientName = `${patient.fName} ${patient.lName}`;

    if (appointment.status === "upcoming") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} is scheduled for ${localDate}`;
      notificationMessageDoctor = `Your appointment with ${patientName} is scheduled for ${localDate}`;
    } else if (appointment.status === "cancelled") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} on ${localDate} has been cancelled`;
      notificationMessageDoctor = `Your appointment with ${patientName} on ${localDate} has been cancelled`;
    } else if (appointment.status === "rescheduled") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} has been rescheduled to ${localDate}`;
      notificationMessageDoctor = `Your appointment with ${patientName} has been rescheduled to ${localDate}`;
    }
    //  else {
    //   notificationMessagePatient = `Your appointment with Dr. ${doctorName} on ${localDate} has an update`;
    //   notificationMessageDoctor = `Your appointment with ${patientName} on ${localDate} has an update`;
    // }

    // Create a new notification
    const newNotificationDoctor = await Notification.create({
      doctor: doctorId,
      title: "Appointment Update",
      message: notificationMessageDoctor,
      date: new Date(),
      read: false,
    });

    // Create a new notification
    const newNotificationPatient = await Notification.create({
      patient: patient._id,
      title: "Appointment Update",
      message: notificationMessagePatient,
      date: new Date(),
      read: false,
    });

    // Send the new notification to the doctor's email
    await sendNotificationsByEmail(doctor.email, [newNotificationDoctor]);
    await sendNotificationsByEmail(patient.email, [newNotificationPatient]);

    res.status(200).json({
      status: "success",
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const sendNotificationsByEmail = async (patientEmail, notifications) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // configure your email provider here
      service: "gmail",
      auth: {
        user: "3projectalpha3@gmail.com",
        pass: "ncgo dehg lebs zazh",
      },
    });

    // Compose email message
    const mailOptions = {
      from: "3projectalpha3@gmail.com",
      to: patientEmail,
      subject: "New Notifications",
      text: `You have new notifications:\n\n${formatNotifications(
        notifications
      )}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Helper function to format notifications for email
const formatNotifications = (notifications) => {
  // Customize the formatting based on your needs
  return notifications
    .map((notification) => `${notification.title}: ${notification.message}`)
    .join("\n");
};

const setEmploymentContract = async (req, res) => {
  const doctorId = req.params.id;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    // Set employmentContract to true
    doctor.employmentContractAccepted = true;

    // Save the updated doctor object
    await doctor.save();

    return res
      .status(200)
      .json({ message: "Employment contract set to true successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// MERGINGG

const getAllMedicines = async (req, res) => {
  try {
    const medicine = await Medicine.find(
      { archived: false },
      "name image price description medicinalUse"
    ).sort({ createdAt: -1 });

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//hanas stuff
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Try to find the user in each collection
    const patient = await Patient.findById(id);
    if (patient) {
      return res.status(200).json(patient);
    }
    const doctor = await Doctor.findById(id);
    if (doctor) {
      return res.status(200).json(doctor);
    }
    const admin = await Admin.findById(id);
    if (admin) {
      return res.status(200).json(admin);
    }

    // If none of the above, user not found
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  rescheduleAppointment,
  cancelAppointmentforPatient,
  pendingReq,
  acceptRequest,
  rejectRequest,
  getAllMedicines,
  createPrescription,
  updatePrescription,
  changeDoctorPassword,
  getUserById,
  getDoctorNotifications,
  createAppointmentNotifications,
  setEmploymentContract,
  markAllNotificationsAsRead,
};
