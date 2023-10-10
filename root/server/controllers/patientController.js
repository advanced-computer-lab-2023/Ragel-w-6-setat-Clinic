import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";

// create (register) a patient
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

 const searchForDoctor = async (req, res) =>{
  const { name, specialty } = req.query; 

  try {
    const filter = {}; 

    if (name) {
      // If a name is provided, add a regex filter for first name and last name
      filter.$or = [
        { fName: { $regex: name, $options: 'i' } }, 
        { lName: { $regex: name, $options: 'i' } }, 
      ];
    }
    if (specialty) {
      filter.specialty = { $regex: specialty, $options: 'i' }; 
    }
    const doctors = await Doctor.find(filter);

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
 
 const filterAvailableAppointments = async(req, res) =>{
  const { status, date } = req.query;

  try {
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.date = new Date(date);
    }

    const appointments = await Appointments.find(filter);

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
 };

  const filtermyAppointments = async(req,res) =>{
   const  patientId  = req.params.id; // Get patientId from URL parameter

    try {
      const filter = {};

      if(req.body.date)
      {
        filter.date = req.body.date;
      }

      if(req.body.status)
      {
        filter.status = req.body.status;
      }

      if(req.params.id)
      {
        filter.patient = req.params.id;
      }

      const patient = await Patient.findById(patientId);

      const appointments = await Appointments.find(filter);
      
        res.status(200).json(appointments)
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }

 };


 const filterDoctors = async(req, res) =>{
  try {
    const { specialty, date, time} = req.body;
    const filter = {};
   
    if (specialty) filter.specialty = specialty;
   
    if (date) filter.date = date;

    if(time) filter.time = time;
    
    // Retrieve all doctors from the database
    const doctor = await Doctor.find(filter);
    console.log(filter.specialty + filter.date + filter.time);

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

const selectDoctor = async (req, res) => {
  // const patiendID = req.params.id;
  const doctorUsername = req.body.username;
  try {
    
    const doctor = await Doctor.find({username : doctorUsername});
    if(!doctor){
      return res.status(404).json({message: "Doctor not found"});
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};;

export { createPatient, searchForDoctor ,filterAvailableAppointments , filtermyAppointments, filterDoctors ,selectDoctor };
