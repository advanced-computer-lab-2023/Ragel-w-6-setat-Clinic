import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointments from "../models/Appointments.js";

// submit a request to register as a doctor

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

const renderHomePage = function (req, res) {
  res.render("doctorHome", { userId: req.params.id });
};

const renderProfilePage = async function (req, res) {
  const doctorid = req.params.id;
  const doctor = await Doctor.findById(doctorid);
  res.render("doctorProfile", { userId: req.params.id, doctor: doctor });
};

const renderRegisterationPage = function (req, res) {
  res.render("doctorRegister");
};

const createDoctor = async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.create(req.body);
    res.render("login", {
      submittedSuccessfully: true,
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
    res.render("packageManagement", {
      userId: doctorid,
      doctor: doctor,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// MARIAMS REQS

const searchForPatient = async (req, res) => {
  const { fname, lname } = req.query;
  const doctorId = req.params.id;
  try {
    const patients = await Patient.find({
      $or: [
        { fName: { $regex: new RegExp(fname, "i") } },
        { lName: { $regex: new RegExp(lname, "i") } },
      ],
    });

    if (patients.length === 0) {
      res.status(404).json({ error: "Patients not found" });
    } else {
      res.status(200).json(patients);
    }
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
      filter.date = req.query.date;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    filter.doctor = req.params.id;

    const appointments = await Appointments.find(filter);
    res.status(200).json(appointments);
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
    res.json({
      data: patientsWithUpcomingAppointments,
    });
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
          doctorPatients.push(patient);
        } catch (error) {
          console.error("Error finding patient:", error);
          // Handle error if necessary
        }
      }
    }

    res.json(doctorPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSinglePatient = async (req, res) => {
  const doctorID = req.params.id;
  const patientID = req.body.pid;
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

      // Send patient information back to the doctor
      res.json(patient);
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
  renderHomePage,
  renderRegisterationPage,
  renderProfilePage,
  searchForPatient,
  filterMyAppointments,
  upcomingAppointments,
  getMyPatients,
  getSinglePatient,
};
