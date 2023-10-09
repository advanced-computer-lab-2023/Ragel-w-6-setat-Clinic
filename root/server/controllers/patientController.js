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
    const { patientId } = req.params; 

  try {
    const filter = { patient: patientId };

    if (date) {
      filter.date = new Date(date);
    }
    if (status) {
      filter.status = status;
    }

    const appointments = await Appointments.find(filter);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  }


const filterDoctors = async(req, res) =>{
  try {
    const { specialty, date, time } = req.query;

    // Create a filter object based on query parameters
    const filter = {};

    if (specialty) {
      filter.specialty = specialty;
    }

    if (date) {
      filter.availability.date = new Date(date);
    }

    if (time) {
      filter.availability.time = time;
    }

    // Query the database to find doctors that match the filter criteria
    const doctors = await Doctor.find(filter);

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


export { createPatient, searchForDoctor ,filterAvailableAppointments , filtermyAppointments, filterDoctors};
