import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Appointments from "../models/Appointments.js";

const viewUpcomingAppointments = async (req, res) => {
    const doctorId = req.params.id;
  
    try {
      // Check if the patient exists
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({
          status: "fail",
          message: "Doctor not found",
        });
      }
  
      
      const appointments = await Appointments.find({
        doctor: doctorId, status : "upcoming"
      });
  
      // const doctorsSet = await Doctor.find({ isRegistered: true }).select(
      //   "username"
      // );
  
      res.json({appointments : appointments});
    } catch (err) {
      // Handle errors, for example, database connection issues
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

  const getHealthRecords = async (req, res) => {
    try {
      const doctorId = req.params.id; // Get patient's email from the request body
  
      // Find the patient using the provided email in the familyMembers array
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res
          .status(404)
          .json({ message: "No Doctor" });
      }
  

      const patientID = req.query.id; 
      const patient = await Patient.findById(patientID);
      const medicalHistory = patient.medicalHistory;
  
      res.json(medicalHistory);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const filterAppointments = async (req, res) => {
    const doctorId = req.params.id;
    try {
      const filter = {};
  
      if (req.query.status) {
        filter.status = req.query.status;
      }
  
      if (req.params.id) {
        filter.doctor = doctorId;
      }
  
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
  
      const appointments = await Appointments.find(filter);
  
  
      res.json({appointments : appointments});
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


  const addAvailableAppointments = async (req, res) => {
    try {
      const { date, type } = req.query; // Extract date and type from the request body
      const doctorId = req.params.doctorId; // Assuming you have the doctorId in the route parameters
  
      // Create a new appointment
      const appointment = new Appointments({
        doctor: doctorId,
        date,
        isAvailable: true,
        type, // Assign the extracted type to the appointment
        status: "upcoming"
      });
  
      // Save the appointment to the database
      await appointment.save();
  
      res.status(201).json({
        status: "success",
        message: "Appointment created successfully",
        data: appointment
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to create appointment"
      });
    }
  };
  
  
export {
    viewUpcomingAppointments,
    getHealthRecords,
    filterAppointments,
    addAvailableAppointments
  };