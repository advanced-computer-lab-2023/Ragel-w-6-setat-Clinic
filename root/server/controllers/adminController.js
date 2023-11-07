import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Package from "../models/Package.js";
import Appointment from "../models/Appointments.js";
import Prescription from "../models/Prescription.js";

const getAllAdmins = async (req, res) => {
  async (req, res) => {
    try {
      const admins = await Admin.find({}, "username password"); // Retrieve only username and password fields
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

const getAllPackages = async (req, res) => {
  const adminId = req.params.id;
  try {
    const packages = await Package.find({});
    res.status(200).json({ packages: packages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create an admin
const createAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Admin successfully added.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// have an admin create a package
const createPackage = async (req, res) => {
  try {
    const pack = await Package.create(req.body);
    const packages = await Package.find({});
    const adminId = req.params.id;
    res.status(201).json({
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// have an admin delete a package

const deletePackage = async (req, res) => {
  const adminId = req.params.userid;
  try {
    const pack = await Package.findByIdAndDelete(req.params.packageid);
    const packages = await Package.find({});
    res.status(201).json({
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update a package

const updatePackage = async (req, res) => {
  const adminId = req.params.userid;
  try {
    const pack = await Package.findOneAndUpdate(
      { _id: req.params.packageid },
      {
        ...req.body,
      }
    );
    const packages = await Package.find({});
    res.status(201).json({
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//LOJAINS REQS

const getAllDoctors = async function (req, res) {
  const adminId = req.params.id;
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({ doctors: doctors });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getAllPatients = async function (req, res) {
  const adminId = req.params.id;
  try {
    const patients = await Patient.find({});
    res.status(200).json({ patients: patients });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };

    const deleteAdminResult = await Admin.deleteMany(filter);
    const allAdmins = await Admin.find({ _id: { $ne: adminId } });

    if (deleteAdminResult.length === 0) {
      res.status(404).json({
        status: "fail",
        admins: allAdmins,
        message: "No such admin in the system",
      });
    } else {
      res.status(200).json({
        status: "success",
        admins: allAdmins,
        message: "Admin successfully deleted.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };
    const deletedPatientResult = await Patient.findOneAndDelete(filter);
    const deleteRelatedAppointments = await Appointment.deleteMany({
      patient: deletedPatientResult._id,
    });
    const deleteRelatedPrescriptions = await Prescription.deleteMany({
      patient: deletedPatientResult._id,
    });
    const allPatients = await Patient.find();

    if (deletedPatientResult.deletedCount == 0) {
      res.status(404).json({
        status: "fail",
        patients: allPatients,
        message: "No such patient in the system",
      });
    } else {
      res.status(200).json({
        status: "success",
        patients: allPatients,
        message: "Patient successfully deleted.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };
    const deleteDoctorResult = await Doctor.findOneAndDelete(filter);
    const deleteRelatedAppointments = await Appointment.deleteMany({
      doctor: deleteDoctorResult._id,
    });
    const deleteRelatedPrescriptions = await Prescription.deleteMany({
      doctor: deleteDoctorResult._id,
    });
    const allDoctors = await Doctor.find();

    if (deleteDoctorResult.deletedCount == 0) {
      res.status(404).json({
        status: "fail",
        doctors: allDoctors,
        message: "No such doctor in the system",
      });
    } else {
      res.status(200).json({
        status: "success",
        doctors: allDoctors,
        message: "Doctor successfully deleted.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const viewUnregisteredDoctors = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctors = await Doctor.find({
      isRegistered: false,
    });

    res.status(200).json({
      status: "success",
      doctors: doctors,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
  getAllAdmins,
  getAllPackages,
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors,
  getAllDoctors,
  getAllPatients,
};
