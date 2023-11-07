import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointments from "../models/Appointments.js";

// HABIBAS REQS

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
    const doctor = await Doctor.findById(doctorid);
    res.status(200).json({ doctor: doctor });
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
    const doctorid = req.params.userid;
    res.status(200).json({ doctor: doctor });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const scheduleFollowUp = async (req, res) => {
  const doctorId = req.params.doctorid;
  const patientUsername = req.body.patientUsername;

  try {
    const patient = await Patient.findOne({ username: patientUsername });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointment = await Appointments.create({
      patient: patient._id,
      doctor: doctorId,
      date: req.body.date,
      isAvailable: false,
      type: "follow-up",
      status: "upcoming",
    });

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully.",
    });
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

    res.status(200).json({ patients: filteredPatients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    });
    const patientIds = upcomingAppointments.map((Appointment) => {
      return Appointment.patient;
    });
    // Find patients based on their IDs using Promise.all
    const patientsWithUpcomingAppointments = await Promise.all(
      patientIds.map(async (patientId) => {
        return await Patient.findById(patientId);
      })
    );
    res.status(200).json({ patients: patientsWithUpcomingAppointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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

    res.status(200).json({ patients: doctorPatients });
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
      res.status(200).json({ patient: patient });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
};
