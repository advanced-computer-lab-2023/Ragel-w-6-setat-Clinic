import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointments from "../models/Appointments.js";

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
    res.status(500).json({ message: "Internal Server Error" });
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
    patient.medicalHistory.push(req.file.filename);
    await patient.save();
    res.status(200).json({
      status: "success",
      message: "Document uploaded successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getMedicalHistoryForPatient = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientId = req.params.patientid;
  try {
    const patient = await Patient.findById(patientId);
    res.status(200).json(patient.medicalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// MARIAMS REQS

const searchForPatient = async (req, res) => {
  const doctorId = req.params.id;
  const filter = {};
  if (req.query.fName != "") {
    filter.fName = req.query.fName;
  }
  if (req.query.lName != "") {
    filter.lName = req.query.lName;
  }
  try {
    const appointments = await Appointments.find({
      doctor: doctorId,
    }).populate("patient");
    const doctorPatients = [];

    for (const appointment of appointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;
        try {
          const patient = await Patient.findById(patientId).exec();
          const isPatientExists = doctorPatients.some((docPatient) =>
            docPatient._id.equals(patient._id)
          );
          if (!isPatientExists) {
            doctorPatients.push(patient);
          }
        } catch (error) {
          console.error("Error finding patient:", error);
          // Handle error if necessary
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
    res.status(500).json({ message: "Server error" });
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//----------------------------------------------------------sprint 3--------------------------------------------------------------//
const viewAllPrescription = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const allPrescriptions = await Prescription.find({ doctor: doctorId });
    if (!allPrescriptions || allPrescriptions.length === 0) {
      return res.status(404).json({ error: 'No prescriptions found for the specified doctor' });
    }

    const prescriptionsWithStatus = allPrescriptions.map((prescription) => {
      return {
        medicines: prescription.medicines.map((medicine) => {
          return {
            name: medicine.name,
            dosage: medicine.dosage,
          };
        }),
        isFilled: prescription.isFilled,
        date: prescription.date,
        notes: prescription.notes,
      };
    });

    res.json(prescriptionsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addDosage = async (req, res) => {
  const doctorId = req.params.id;
  const { name, dosage } = req.body;
  try {
    const prescription = await Prescription.findOne({doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToUpdate = prescription.medicines.find((medicines) => medicines.name === name);
    console.log(medicineToUpdate);
    if (!medicineToUpdate) {
      return res.status(404).json({ message: 'Medicine not found in the prescription' });
    }
    medicineToUpdate.dosage = dosage;
    await prescription.save();
    res.json({ message: 'Dosage updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addMedicine = async (req, res) => {
  const doctorId = req.params.id;
  const { name, dosage } = req.body;
  try {
    const prescription = await Prescription.findOne({ doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToAdd = prescription.medicines.find((medicines) => medicines.name === name);
    if (medicineToAdd) {
      return res.status(404).json({ message: 'Medicine already exists in the prescription' });
    }
    const newMedicine = { name, dosage };
    prescription.medicines.push(newMedicine);    
    await prescription.save();
    res.json({ message: 'Medicine added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteMedicine = async (req, res) => {
  const doctorId = req.params.id;
  const { name } = req.body;
  try {
    const prescription = await Prescription.findOne({ doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToDelete = prescription.medicines.find((medicines) => medicines.name === name);
    if (!medicineToDelete) {
      return res.status(404).json({ message: 'Medicine not found in the prescription' });
    }
    prescription.medicines = prescription.medicines.filter((medicine) => medicine.name !== name);
    await prescription.save();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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
        console.log(patientId);
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
    res.status(500).json({ message: "Server Error" });
  }
};

const getSinglePatient = async (req, res) => {
  const doctorID = req.params.doctorid;
  const patientID = req.params.patientid;
  try {
    const appointment = await Appointments.findOne({
      doctor: doctorID,
      patient: patientID,
    }).populate("patient");
    if (!appointment) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (appointment != null) {
      const patient = await Patient.findById(patientID).exec();
      res.status(200).json(patient);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
  addDosage,
  addMedicine,
  deleteMedicine,
};
