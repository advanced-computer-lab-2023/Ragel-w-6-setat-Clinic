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
  const { name, specialty } = req.body;

  try {
    const query = {};
    
    if (name) {
      query.$or = [
        { fName: { $regex: new RegExp(name, 'i') } },
        { lName: { $regex: new RegExp(name, 'i') } }
      ];
    }

    if (specialty) {
      query.specialty = { $regex: new RegExp(specialty, 'i') };
    }

    const doctors = await Doctor.find(query);
    console.log(doctors);

    if (doctors.length === 0) {
      res.status(404).json({ error: 'Doctors not found' });
    } else {
      res.status(200).json(doctors);
    }
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

 const filterDoctors = async (req, res) => {
 
  try {

    const specialty = req.body.specialty

    const date = req.body.date;
    const appointmentsByDate = await Appointments.find({date : date,  isAvailable : true});
    const filter = {};
    const doctorIDS = [];




appointmentsByDate.forEach((appointment) => {
  if (appointment.isAvailable === true) {
    doctorIDS.push(appointment.doctor);
  }
});

if (specialty) {
  filter.specialty = specialty;
}

if (doctorIDS.length > 0) {
  filter._id = { $in: doctorIDS };
}

try {
  const doctors = await Doctor.find(filter).exec();
  res.json(doctors);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}

    // const doctorFound =  Doctor.find(filter);
    // console.log("DOCTORRRRR FOUNDDDDD" + doctorFound);

    

    // // const doctorID = await Appointments.doctor.find({date : date, isAvailable : true});
    // // console.log(doctorID);
    // res.json(doctorFound);




















    // const availableDoctors = await Promise.all(
    //   allDoctors.map(async (doctor) => {
    //     if (date && time) {
    //       // Check if there is an appointment at the specified date and time
    //       const appointment = await Appointments.findOne({
    //         doctor: doctor._id,
    //         date,
    //         isAvailable: true,
    //       });
    //       if (appointment) {
    //         return null; // Doctor is not available
    //       }
    //     }
    //     return doctor; // Doctor is available
    //   })
    // );
  //   const filteredDoctors = availableDoctors.filter(doctor => doctor !== null);

  //   if (filteredDoctors.length === 0) {
  //     res.status(404).json({ error: 'No available doctors found' });
  //   } else {
  //     res.status(200).json(filteredDoctors);
  //   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  // }
};}

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
