import Appointment from "../models/Appointments.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";


// submit a request to register as a doctor
const createDoctor = async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    res.status(201).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

 const getMyPatients = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient');
    const doctorPatients = [];
    
    for (const appointment of appointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;
        try {
          const patient = await Patient.findById(patientId).exec();
          doctorPatients.push(patient);
        } catch (error) {
          console.error('Error finding patient:', error);
          // Handle error if necessary
        }
      }
    }

    res.json(doctorPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getSinglePatient = async (req, res) => {
  const  doctorID  = req.params.id;
  const patientID = req.body.pid;
  try {
    
    const appointment = await Appointment.findOne({doctor: doctorID, patient: patientID}).populate('patient');
    if (!appointment) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if(appointment!=null){
    const patient = await Patient.findById(patientID).exec();

    // Send patient information back to the doctor
    res.json(patient);
    
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  

export { createDoctor, updateDoctorProfile , getMyPatients, getSinglePatient};
