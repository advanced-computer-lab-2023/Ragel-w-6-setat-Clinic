import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";

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



// Patient adds a family member using certain attributes req #14
const addFamMem = async (req, res) => {
  const patientId = req.params.id;
  const {
    fName,
    lName,
    nationalID,
    gender,
    dateOfBirth,
    relationship
  } = req.body;
  const validRelationships = ["wife", "husband", "son", "daughter"];

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found',
      });
    }

    // Check if the relationship is valid (wife, husband, or children)
    if (!validRelationships.includes(req.body.relationship)) {
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
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


// Patient can view list of all prescriptions req #54
const viewPrescription = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found',
      });
    }



    const prescriptions = await Prescription.find({
      patient: patientId
    });

    res.status(200).json({
      status: 'success',
      data: {
        prescriptions: prescriptions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


// Filter Prescriptions based on date or doctor or filled or unfilled req #55
const filterthepresc = async (req, res) => {
  const patientId = req.params.id;
  try {

    const filter = {};

    if (req.body.doctor) {
      filter.doctor = req.body.doctor;
    }

    if (req.body.date) {
      filter.date = req.body.date;
    }

    if (req.body.isFilled) {
      filter.isFilled = req.body.isFilled;
    }

    if (req.params.id) {
      filter.patient = req.params.id;
    }
    const patient = await Patient.findById(patientId);
    console.log("IS " + req.body.date + req.body.doctor + req.body.isFilled + patientId);
    const prescription = await Prescription.find(filter);

    res.status(200).json({
      status: 'success',
      data: {
        prescription: prescription,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};



// Patient can select a prescription from his/her list of prescriptions req #56
const selectPres = async (req, res) => {
  const prescriptionId = req.body.id;
  const patiendID = req.params.id;

  try {
    const prescription = await Prescription.find({
      _id: prescriptionId,
      patient: patiendID
    });

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
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


//mariams
const filterDoctors = async (req, res) => {
  try {

    const {
      specialty,
      date,
      time
    } = req.body;

    // Construct the filter based on the provided query parameters
    const filter = {};

    if (specialty) filter.specialty = specialty;

    if (date) filter.date = date;

    if (time) filter.time = time;

    // Retrieve all doctors from the database

    const doctor = await Doctor.find(filter);
    console.log(filter.specialty + filter.date + filter.time);

    // Send the list of doctors as a JSON response
    res.status(200).json({
      status: 'success',
      data: {
        doctor: doctor,
      },
    });
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}
export {
  createPatient,
  addFamMem,
  viewPrescription,
  filterthepresc,
  selectPres,
  filterDoctors,
};