import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";
import Package from "../models/Package.js";

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
 /* const { name, specialty } = req.body;
  const patientID = req.params.id;
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

    console.log(query);

    const doctors = await Doctor.find(query);

    console.log(doctors);

    if (doctors.length === 0) {
      res.status(404).json({ error: 'Doctors not found' });
    } else {
      res.status(200).json(doctors);
      // res.render('searchForDoctors', { doctors, userID: patientID });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }*/
  
  const patientID = req.params.id;
  const filter = {};
  if (req.query.specialty != "") {
    filter.specialty = req.query.specialty;
  }
  if (req.query.fName != "") {
    filter.fName = req.query.fName;
  }
  if (req.query.lName != "") {
    filter.lName = req.query.lName;
  }
  filter.isRegistered = true;

  try {
   /* const allDoctors = await Doctor.find().lean();
    const uniqueSpecialtiesSet = new Set();
    allDoctors.forEach((doctor) => {
      uniqueSpecialtiesSet.add(doctor.specialty);
    });
    const uniqueSpecialties = [...uniqueSpecialtiesSet];*/

    const doctors = await Doctor.find(filter);
      res.json(doctors)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
 
 const filterAvailableAppointments = async(req, res) =>{
  const { status, date } = req.query;
  //const patientID = req.params.id;
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
    //res.render('pateintAppointments', { userID: patientID ,appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
 };

  const filtermyAppointments = async(req,res) =>{
   const  patientId  = req.params.id; // Get patientId from URL parameter

    try {
      const filter = {};

      if(req.query.date)
      {
        filter.date = req.queryq.date;
      }

      if(req.query.status)
      {
        filter.status = req.query.status;
      }

      if(req.params.id)
      {
        filter.patient = req.params.id;
      }

      const patient = await Patient.findById(patientId);
      const appointments = await Appointments.find(filter);
      
       res.status(200).json(appointments)
       //res.render('pateintAppointments', { appointments, userID: patientId }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
 };

 const filterDoctors = async (req, res) => {
 
  try {
    const specialty = req.body.specialty
    const patientId = req.params.id;
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
 // res.render('filterDoctors', { doctors, userID: patientId });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}
    // const doctorFound =  Doctor.find(filter);
    // console.log("DOCTORRRRR FOUNDDDDD" + doctorFound);
    // // const doctorID = await Appointments.doctor.find({date : date, isAvailable : true});
    // // console.log(doctorID);
    // res.json(doctorFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
};}

const selectDoctor = async (req, res) => {
  const patientID = req.params.id;
  const doctorUsername = req.query.username;
  try {
    
    const doctor = await Doctor.find({username : doctorUsername});
    if(!doctor){
      return res.status(404).json({message: "Doctor not found"});
    }
    res.json(doctor);
   //res.render('selectDoctor', { doctor, userID: patientID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    //const patientID = req.params.id;
    const filter = {};
    filter.isRegistered = true;
    const doctors = await Doctor.find(filter).lean();
    const uniqueSpecialtiesSet = new Set();
    doctors.forEach((doctor) => {
      uniqueSpecialtiesSet.add(doctor.specialty);
    });
    const uniqueSpecialties = [...uniqueSpecialtiesSet];

    //const doctorsToDisplay = await doctorsDisplay(patientID, doctors);

    res.json(doctors);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//----------------------------------------------------------sprint 2--------------------------------------------------------------//

const viwHealthPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const linkFamilyMember = async (req, res) => {
  try {
    const { email, phoneNum, relationship } = req.body;
    const patientId = req.params.id;
    const requestingPatient = await Patient.findById(patientId);

    if (!requestingPatient) {
      return res.status(404).json({ error: 'Requesting patient not found' });
    }

    const existingPatient = await Patient.findOne({ $or: [{ email }, { phoneNum }] });
    if (!existingPatient) {
      return res.status(404).json({ error: 'Patient to link not found' });
    }

    // Check if the family member already exists
    const existingFamilyMember = requestingPatient.familyMembers.find(
      (member) => member.email === existingPatient.email
    );

    if (existingFamilyMember) {
      return res.status(400).json({ error: 'Family member already exists' });
    }
    
    const { fName, lName, gender ,dateOfBirth } = existingPatient;
    requestingPatient.familyMembers.push({
      email: existingPatient.email,
      fName,
      lName,
      gender,
      dateOfBirth,
      relationship,
    });
    await requestingPatient.save();
    return res.status(201).json({ message: 'Family member linked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while linking a family member' });
  }
};

const payAppointment = async (req, res) => { 

};







export { 
  createPatient, 
  searchForDoctor,
  filterAvailableAppointments,
  filtermyAppointments,
  filterDoctors,
  selectDoctor,
  getAllDoctors,
  viwHealthPackages,
  linkFamilyMember,
  payAppointment
 };
