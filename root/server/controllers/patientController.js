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


// Route to get all prescriptions of a specific patient
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
const prescriptions = await Prescription.find({patient : patientId});  

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



const filterthepresc =  async (req, res) => {
  const patientId = req.params.id; 
  try {
  
    const patient = await Patient.findById(patientId);
    console.log("IS " + req.body.date + req.body.doctor + req.body.isFilled + patientId);
    const prescription = await Prescription.find({
      $or: [
        { doctor: req.body.doctor },
        { date: req.body.date },
        { patient: patientId },
        { isFilled: req.body.isFilled }
      ]
    });
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




//add family member


// Route to add a new family member to a patient
const addFamMem =  async (req, res) => {
  const patientId = req.params.id;
  const { fName, lName, nationalID, gender, dateOfBirth,relationship } = req.body;
  const validRelationships = ["wife", "husband", "son","daughter"];

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
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


// select prescription
const selectPres =  async (req, res) => {
  const prescriptionId = req.body.id;
  const patiendID = req.params.id;

  try {
    // Find the prescription by ID
    const prescription = await Prescription.find({_id:prescriptionId, patient: patiendID});

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


//mariams
const filterDoctors = async(req, res) =>{
  try {

    const { specialty, date, time} = req.body;

    // Construct the filter based on the provided query parameters
    const filter = {};
   
    if (specialty) filter.specialty = specialty;
   
    if (date) filter.date = date;

    if(time) filter.time = time;
    
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
export { createPatient, viewPrescription,addFamMem,selectPres,filterDoctors,filterthepresc};
