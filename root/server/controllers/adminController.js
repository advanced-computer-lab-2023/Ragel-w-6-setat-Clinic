import Admin from "../models/Admin.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

// delete Admin 
const deleteAdmin = async (req, res) => {
    try {

      

      const deleteAdmin = await Admin.deleteMany(req.body.username);
  
      if (!deleteAdmin) {
        // If patient with the given ID is not found, return 404 Not Found status
        return res.status(404).json({
          status: "fail",
          message: "Admin not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          admin: deleteAdmin,
        },
      });
    } catch (err) {
      // Handle other errors (e.g., invalid request, server error)
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

  // delete patient 
const deletePatient = async (req, res) => {
    try {
  
      const deletedPatient = await Patient.deleteMany(req.body.username);
  
      if (!deletedPatient) {
        // If patient with the given ID is not found, return 404 Not Found status
        return res.status(404).json({
          status: "fail",
          message: "Patient not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          deleted: deletedPatient,
        },
      });
    } catch (err) {
      // Handle other errors (e.g., invalid request, server error)
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

  // delete doctor 
const deleteDoctor = async (req, res) => {
    try {
    
      const deleteDoctor = await Doctor.deleteMany(req.body.username);
  
      if (!deleteDoctor) {
        // If patient with the given ID is not found, return 404 Not Found status
        return res.status(404).json({
          status: "fail",
          message: "Doctor not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          patient: deleteDoctor,
        },
      });
    } catch (err) {
      // Handle other errors (e.g., invalid request, server error)
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

// view doctors name
const viewUnregisteredDoctors =  async (req, res) => {
  try {

     const doctor = await Doctor.find({isRegistered : false});

    // Send the list of doctors as a JSON response
    res.status(200).json({
      status: 'success',
      data: {
        doctor: doctor,
      },
    });
  } catch (err) {
   
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

  export {deleteAdmin,deletePatient,deleteDoctor,viewUnregisteredDoctors};