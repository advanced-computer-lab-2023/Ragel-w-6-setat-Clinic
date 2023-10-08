import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";

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


// Route to get prescriptions of a specific patient
const viewPrescription =  async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found',
      });
    }

    // Retrieve prescriptions for the specific patient
    const prescriptions = await Prescription.find({ patient: patientId });

    res.status(200).json({
      status: 'success',
      data: {
        prescriptions: prescriptions,
        patient: patient
      },
    });
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const filteredPresc = async (req, res) => {
  try {
    // Build the filter object based on query parameters
    const filter = {};
    if (req.query.date) {
      filter.date = req.query.date; // Assuming the date format matches the database schema
    }
    if (req.query.doctor) {
      const doctor = await Doctor.findOne({ username: req.query.doctor });
      if (doctor) {
        filter.doctor = doctor._id;
      } else {
        return res.status(404).json({
          status: 'fail',
          message: 'Doctor not found',
        });
      }
    }
    if (req.query.isFilled) {
      filter.isFilled = req.query.isFilled === 'true';
    }

    // Retrieve prescriptions based on the filter
    const prescriptions = await Prescription.find(filter);

    res.status(200).json({
      status: 'success',
      data: {
        prescriptions: prescriptions,
      },
    });
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};



export { createPatient, viewPrescription,filteredPresc};
