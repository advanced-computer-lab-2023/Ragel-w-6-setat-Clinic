import Admin from "../models/Admin.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

// delete Admin 
const deleteAdmin = async (req, res) => {
    try {
      // Assuming req.body contains an object with the patient ID to be deleted, for example: { id: "patientIdHere" }
      
      // Use findByIdAndDelete to delete a patient by their ID
      const deleteAdmin = await Admin.deleteMany(req.body);
  
      if (!deleteAdmin) {
        // If patient with the given ID is not found, return 404 Not Found status
        return res.status(404).json({
          status: "fail",
          message: "Patient not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          patient: deleteAdmin,
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
      // Assuming req.body contains an object with the patient ID to be deleted, for example: { id: "patientIdHere" }
      
      // Use findByIdAndDelete to delete a patient by their ID
      const deletedPatient = await Patient.deleteMany(req.body);
  
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
          patient: deletedPatient,
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
      // Assuming req.body contains an object with the patient ID to be deleted, for example: { id: "patientIdHere" }
      
      // Use findByIdAndDelete to delete a patient by their ID
      const deleteDoctor = await Doctor.deleteMany(req.body);
  
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

// view doctors
const viewDoctors =  async (req, res) => {
  try {

    const { fName, lName, specialty } = req.query;

    // Construct the filter based on the provided query parameters
    const filter = {};
    if (fName) filter.fName = fName;
    if (lName) filter.lName = lName;
    if (specialty) filter.specialty = specialty;
    // Retrieve all doctors from the database
    const doctors = await Doctor.find(filter);

    // Send the list of doctors as a JSON response
    res.status(200).json({
      status: 'success',
      data: {
        doctors: doctors,
      },
    });
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

  export {deleteAdmin,deletePatient,deleteDoctor,viewDoctors};