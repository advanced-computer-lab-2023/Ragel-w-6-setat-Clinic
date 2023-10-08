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

const getAllPatients = async (req, res) => {
 
  try {
    const { email } = req.body;
    const registration = req.body.isRegistered;
    
    if(registration == false ){
      return res.status(403).json({ message: 'Doctor not authorized to view patients' });
    }
    // Find all patients associated with this doctor
    const patients = await Patient.find({ 'email': email});

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  

export { createDoctor, updateDoctorProfile , getAllPatients};
