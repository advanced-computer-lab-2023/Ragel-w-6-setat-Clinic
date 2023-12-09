import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Package from "../models/Package.js";
import Appointment from "../models/Appointments.js";
import Prescription from "../models/Prescription.js";

// get an admin's details

const getAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId).select("username");
    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admins = await Admin.find({}); // Retrieve only username and password fields
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPackages = async (req, res) => {
  const adminId = req.params.id;
  try {
    const packages = await Package.find({});
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create an admin
const createAdmin = async (req, res) => {
  const adminId = req.params.id;

  const doctor = await Doctor.findOne({
    username: req.body.username,
  });

  const patient = await Patient.findOne({
    username: req.body.username,
  });

  if (doctor || patient) {
    return res.status(400).json({
      status: "fail",
      message: "username already exists",
    });
  }

  try {
    const admin = await Admin.create(req.body);
    res.status(200).json({
      status: "success",
      admin,
      message: "Admin successfully added.",
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      const message = `${duplicatedField} already exists`;
      res.status(400).json({ status: "fail", message });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "Internal Server Error" });
    }
  }
};

// have an admin create a package
const createPackage = async (req, res) => {
  try {
    const pack = await Package.create(req.body);
    const packages = await Package.find({});
    const adminId = req.params.id;
    res.status(201).json({ message: "package successfully added" });
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
    const deletedPackage = await Package.findByIdAndDelete(
      req.params.packageid
    );
    if (deletedPackage) {
      // Find all patients subscribed to the deleted package
      const patientsToUpdate = await Patient.find({
        "subscribedPackage.packageId": deletedPackage._id,
      });

      // Update each patient's subscribedPackage to null
      const updatePromises = patientsToUpdate.map(async (patient) => {
        patient.subscribedPackage = null;
        return patient.save();
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);
    }
    res.status(200).json({ message: "deleted package successfully" });
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
      message: "updated successfully",
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
    res.status(200).json(doctors);
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
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const username = req.params.adminUser;
    const filter = {
      username,
    };

    const deleteAdminResult = await Admin.findOneAndDelete(filter);

    if (deleteAdminResult.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "No such admin in the system",
      });
    } else {
      res.status(200).json({
        status: "success",
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
    const adminId = req.params.adminId;
    const username = req.params.patientUser;
    const filter = {
      username,
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
    const adminId = req.params.adminId;
    const username = req.params.doctorUser;
    const filter = {
      username,
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

    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const setToRegistered = async (req, res) => {
  try {
    const adminId = req.params.id;
    const doctorUsername = req.query.username; // Extract doctor ID from request params

    // Find the contract by doctor ID and update the isApproved field to true
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { username: doctorUsername },
      { isRegistered: true },
      { new: true } // Return the updated contract
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found for the specified username",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Doctor registered successfully",
      contract: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const rejectDoctor = async (req, res) => {
  try {
    const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };
    const deleteDoctorResult = await Doctor.deleteMany(filter);
    const deleteRelatedAppointments = await Appointment.deleteMany({
      doctor: deleteDoctorResult._id,
    });
    const deleteRelatedPrescriptions = await Prescription.deleteMany({
      doctor: deleteDoctorResult._id,
    });
    const allDoctors = await Doctor.find();

    if (deleteDoctorResult.deletedCount == 0) {
      res.json("No such doctor in the system");
    }

    return res.json("Doctor deleted successfully");
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
  setToRegistered,
  rejectDoctor,
  getAdmin,
};
