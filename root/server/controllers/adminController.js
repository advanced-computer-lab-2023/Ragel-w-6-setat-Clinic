import Admin from "../models/Admin.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointments.js";
import Prescription from "../models/Prescription.js";

// Admin deletes admins from system by username reqID #8
const deleteAdmin = async (req, res) => {
  try {
    //const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };

    const deleteAdminResult = await Admin.deleteMany(filter);
    // const allAdmins = await Admin.find({ _id: { $ne: adminId } });

    if (deleteAdminResult.deletedCount == 0) {
      res.json("No such admin in the system")
    }

    return res.json("Admin deleted successfully")

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
    const adminId = req.params.id;
    const filter = {
      username: req.query.username,
    };
    const deletedPatientResult = await Patient.deleteMany(filter);
    const allPatients = await Patient.find();

    if (deletedPatientResult.deletedCount == 0) {
      res.json("No such patient in the system")
    }

    return res.json("Patient deleted successfully")
    
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
      res.json("No such doctor in the system")
    }

    return res.json("Doctor deleted successfully")
    
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
    const adminId = req.params.id;
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

const getEducationalBackground = async (req, res) => {
  const adminId = req.params.id;
  const doctorUsername = req.query.username;
  try {
    const doctor = await Doctor.findOne({ username: doctorUsername });
    
    // Assuming doctor.educationalBackground is an array of file paths
    res.status(200).json(doctor.educationalBackground);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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


export {
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors,
  getEducationalBackground,
  setToRegistered
};