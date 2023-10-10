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
     const { name } = req.query;
     const { speciality } = req.query;

     try{
      const doctors = await Doctor.find({
       ...req.body
      });
      res.json(doctors);
     }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Server error' });
     }
 }

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
    const { date, status } = req.query;
    const { patientId } = req.params; // Get patientId from URL parameter
  
    try {
      const appointments = await Appointments.find({patientId});
      if(appointments.length === 0)
      {
        res.status(404).json({ error: 'not found ' });
      }
      else
      {
        res.status(200).json(appointments)
      }
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
  const doctorUsername = req.params.id;
  try {
    
    const doctor = await Doctor.findById(doctorUsername);
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
