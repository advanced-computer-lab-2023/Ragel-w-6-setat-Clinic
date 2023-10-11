import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointments.js";
import mongoose from 'mongoose'

const renderSearchPatient = function(req,res){
  const doctorId = req.params.id;
  res.render("searchForPatient",{userID: doctorId})
}

const renderDoctorsAppointment = function(req,res){
  const doctorId = req.params.id;
  res.render("doctorAppointments",{userID: doctorId})
}

const renderUpcomingAppointments = function(req,res){
  const doctorId = req.params.id;
  res.render("upcomingappointments",{userID: doctorId})
}

const searchForPatient =  async( req , res ) =>{
  const { fname, lname } = req.body;

  try {
    const patients = await Patient.find({
      $or: [
        { fName: { $regex: new RegExp(fname, 'i') }},
        { lName: { $regex: new RegExp(lname, 'i') }},
      ],
    });
    console.log(patients);

    if (patients.length === 0) {
      res.status(404).json({ error: 'Patients not found' });
    } else {
      res.status(200).json(patients);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//--sprint 2
//add an appointment
const addAppointment = async (req, res) => {
  try {
     const appointment = await Appointment.create({
      ...req.body,
    });
    res.status(201).json({
      status: "success",
      data: {
        appointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const filterMyAppointments = async (req, res) => {
  const  doctorId  = req.params.id; // Get doctotId from URL parameter

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
      filter.doctor = req.params.id;
    }
    const doctor = await Patient.findById(doctorId);
    const appointments = await Appointment.find(filter);
      res.status(200).json(appointments)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const upcomingAppointments = async(req, res) =>{
  //jwt token //
  const  doctorId  = req.params.id;

  try{
    const upcomingAppointments = await Appointment.find({
      doctor: doctorId,
      status: 'upcoming',
    //  date: { $gte: new Date() }, // Filter for appointments with dates in the future
    });
    const patientIds = upcomingAppointments.map((Appointment) => {
      return Appointment.patient; // Just return the patient ID
    });

    // Find patients based on their IDs using Promise.all
    const patientsWithUpcomingAppointments = await Promise.all(
      patientIds.map(async (patientId) => {
        return await Patient.findById(patientId);
      })
    );
    res.json({
      data: patientsWithUpcomingAppointments, // Send the actual patient data
    });
  }catch(error){    
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export {
   searchForPatient,
   addAppointment, 
   filterMyAppointments, 
   upcomingAppointments
  };
