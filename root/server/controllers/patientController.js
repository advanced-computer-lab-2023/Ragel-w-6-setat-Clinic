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


// filtered presc
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


//add family member
const validRelationships = ["wife", "husband", "children"];

// Route to add a new family member to a patient
const addFamMem =  async (req, res) => {
  const patientId = req.params.id;
  const { fName, lName, nationalID, gender, dateOfBirth, relationship } = req.body;

  try {
    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found',
      });
    }

    // Check if the relationship is valid (wife, husband, or children)
    if (!validRelationships.includes(relationship)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid relationship. Allowed values are wife, husband, or children.',
      });
    }

    // Check if the nationalID of the new family member already exists
    const isDuplicate = patient.familyMembers.some(member => member.nationalID === nationalID);
    if (isDuplicate) {
      return res.status(400).json({
        status: 'fail',
        message: 'National ID already exists for a family member',
      });
    }

    // Add the new family member to the patient's familyMembers array
    const newFamilyMember = {
      fName: fName,
      lName: lName,
      nationalID: nationalID,
      gender: gender,
      dateOfBirth: dateOfBirth,
      relationship: relationship,
    };

    patient.familyMembers.push(newFamilyMember);
    await patient.save();

    res.status(201).json({
      status: 'success',
      data: {
        patient: patient,
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


// select prescription
const selectPres =  async (req, res) => {
  const prescriptionId = req.params.id;

  try {
    // Find the prescription by ID
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({
        status: 'fail',
        message: 'Prescription not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        prescription: prescription,
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


export { createPatient, viewPrescription,filteredPresc,addFamMem,selectPres};
