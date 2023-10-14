import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";




// Patient adds a family member using certain attributes req #14
const addFamilyMember = async (req, res) => {
  const patientId = req.params.id;

  const { fName, lName, nationalID, gender, dateOfBirth, relationship } =
    req.body;

  const validRelationships = ["wife", "husband", "son", "daughter"];

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // if (!validRelationships.includes(relationship)) {
    //   res.render("addFamilyMember", {
    //     message:
    //       "Invalid relationship. Allowed values are wife, husband, son, or daughter.",
    //   });
    // }

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

    res.json({newFamilyMember : newFamilyMember});

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


// Patient can view list of all prescriptions req #54
const viewPrescription = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Find all the prescriptions for the patient
    const prescriptions = await Prescription.find({
      patient: patientId,
    }).populate("doctor");

    const doctorsSet = await Doctor.find({ isRegistered: true }).select(
      "username"
    );

    res.json({prescriptions : prescriptions});
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//QUERYYYYY
// Filter Prescriptions based on date or doctor or filled or unfilled req #55
const filterThePrescription = async (req, res) => {
  const patientId = req.params.id;
  try {
    const filter = {};

    if (req.query.doctor) {
      const doctorsWithSpecificUsername = await Doctor.findOne({
        username: req.query.doctor,
      });
      filter.doctor = doctorsWithSpecificUsername._id;
    }

    if (req.query.date) {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }
    if (req.query.isFilled) {
      filter.isFilled = req.query.isFilled;
    }

    if (req.params.id) {
      filter.patient = req.params.id;
    }

    const prescriptions = await Prescription.find(filter).populate("doctor");

    const doctorsSet = await Doctor.find({ isRegistered: true }).select(
      "username"
    );

    res.json({prescriptions : prescriptions});
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
 


// Patient can select a prescription from his/her list of prescriptions req #56
const selectPrescription = async (req, res) => {
  const prescriptionId = req.params.prescriptionid;
  const patiendID = req.params.patientid;

  try {
    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      patient: patiendID,
    }).populate("doctor");

    if (!prescription) {
      return res.status(404).json({
        status: "fail",
        message: "Prescription not found",
      });
    }

    res.json({prescription : prescription});

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};



export {
  addFamilyMember,
  viewPrescription,
  filterThePrescription,
  selectPrescription
};