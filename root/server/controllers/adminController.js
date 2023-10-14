import Admin from "../models/Admin.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

// Admin deletes admins from system by username reqID #8
const deleteAdmin = async (req, res) => {
  try {
    const filter = {
      username: req.query.username,
    };
    const deleteAdminResult = await Admin.deleteMany(filter);

    if (deleteAdminResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        admin: deleteAdminResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Admin deletes patient from system by username reqID #8 
const deletePatient = async (req, res) => {
  try {
    const filter = {
      username: req.query.username,
    };
    const deletedPatientResult = await Patient.deleteMany(filter);

    if (deletedPatientResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        deleted: deletedPatientResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// Admin deletes doctor from system by username reqID #8 
const deleteDoctor = async (req, res) => {
  try {
    const filter = {
      username: req.query.username,
    };
    const deleteDoctorResult = await Doctor.deleteMany(filter);

    if (deleteDoctorResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        patient: deleteDoctorResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// View all the doctors that are not registered (only requets)
const viewUnregisteredDoctors = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctors = await Doctor.find({
      isRegistered: false,
    });

    res.json(doctors);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


export {
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors
};