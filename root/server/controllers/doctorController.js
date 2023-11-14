import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Appointments from "../models/Appointments.js";
import DoctorContract from "../models/DoctorContract.js";



//view all appointments
const viewAppointments = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    
    const appointments = await Appointments.find({
      doctor: doctorId
    }).populate("patient");

    console.log(appointments);

    res.json({appointments : appointments});
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


// Doctor can view upcoming appointments sprint #2
const viewUpcomingAppointments = async (req, res) => {
    const doctorId = req.params.id;
  
    try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({
          status: "fail",
          message: "Doctor not found",
        });
      }
  
      
      const appointments = await Appointments.find({
        doctor: doctorId, status : "upcoming" 
      }).populate("patient");

      console.log(appointments);

      res.json({appointments : appointments});
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
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({
          status: "fail",
          message: "Doctor not found",
        });
      }
  
      
      const appointments = await Appointments.find({
        doctor: doctorId, status : "completed" 
      }).populate("patient");

      res.json({appointments : appointments});
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


  // Doctor can view health records sprint #2
  const getHealthRecords = async (req, res) => {
    try {
      const doctorId = req.params.id; 
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



// Doctor can create new available appointments sprint #2
  const addAvailableAppointments = async (req, res) => {
    try {
      const { date , price } = req.query; // Extract date and type from the request body
      const doctorId = req.params.id; // Assuming you have the doctorId in the route parameters
      const doctor = await Doctor.findById(doctorId);
  
  
      // Create a new appointment
      const appointment = new Appointments({
        doctor: doctorId,
        patient : null,
        date,
        isAvailable: true,
        price,
        status: "available"
        
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



  // Doctor can view contract sprint #2
  const viewContract = async (req, res) => {
    const doctorId = req.params.id;

    try {
    
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({
          status: "fail",
          message: "Doctor not found",
        });
      }  

      const contracts = await DoctorContract.find({
        doctorId: doctorId,
      });
  
      res.json({contracts : contracts});
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


  // Doctor can accept contract sprint #2
  const acceptContract = async (req, res) => {
    try {
      const doctorId = req.params.id; // Extract doctor ID from request params
  
      // Find the contract by doctor ID and update the isApproved field to true
      const updatedContract = await DoctorContract.findOneAndUpdate(
        { doctorId: doctorId },
        { isApproved: true },
        { new: true } // Return the updated contract
      );
  
      if (!updatedContract) {
        return res.status(404).json({
          status: "fail",
          message: "Contract not found for the specified doctor ID",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Contract accepted successfully",
        contract: updatedContract,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  
      const appointments = await Appointments.find(filter).populate("patient");
  
  
      res.json({appointments : appointments});
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


  const uploadDocument = async (req, res) => {
    const doctorId = req.params.id;
    try {
      const doctor = await Doctor.findById(doctorId);
      doctor.documentID.push(req.file.filename);
      doctor.medicalLicense.push(req.file.filename);
      doctor.medicalDegree.push(req.file.filename);
      await doctor.save();
      res.status(200).json({
        status: "success",
        message: "Document uploaded successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };


  const removeDocument = async (req, res) => {
    const doctorId = req.params.patientid;
    const documentId = req.params.documentid;
    try {
      const doctor = await Patient.findById(doctorId);
  
      // Remove the document from the medicalHistory array
      doctor.educationalBackground = doctor.educationalBackground.filter(
        (document) => document !== documentId
      );
      await doctor.save();
  
      res.status(200).json({ message: "Document removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
export {
    viewUpcomingAppointments,
    getHealthRecords,
    filterAppointments,
    addAvailableAppointments,
    viewContract,
    acceptContract,
    viewPastAppointments,
    uploadDocument,
   removeDocument,
    viewAppointments
  };