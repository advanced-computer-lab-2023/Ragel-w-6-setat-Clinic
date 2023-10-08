import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointments.js";

const searchForPatient =  async( req , res ) =>{
  
  try{
    const patients = await Patient.find({
     ...req.body
    });
    res.json(patients);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

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

const filterMyAppointments = async(req, res) => {
  const { date, status } = req.query;

  try {
    console.log('req.user:', req.user); // Add this line for debugging

    if (!req.user || !req.user.id) {
      console.log('Unauthorized user:', req.user); // Add this line for debugging
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.id;
    const filter = { doctor: userId };

    if (date) {
      filter.date = new Date(date);
    }
    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });

  }
};

const upcomingAppointments = async(req, res) =>{
  const  doctorId  = req.body.doctor;
  try{
    const upcomingAppointments = await Appointment.find({
      doctor: doctorId,
      status: 'upcoming',
    //  date: { $gte: new Date() }, // Filter for appointments with dates in the future
    });
    // Extract patient IDs from upcoming appointments
    const patientIds = upcomingAppointments.map((Appointment) => Appointment.patient);

    // Find patients based on their IDs
    const patientsWithUpcomingAppointments = await Patient.find({ _id: { $in: patientIds } });

    res.json(patientsWithUpcomingAppointments);

  }catch(error){    
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}



export {searchForPatient, addAppointment, filterMyAppointments, upcomingAppointments};
