import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";




// Patient adds a family member using certain attributes req #14 sprint #1
const addFamilyMember = async (req, res) => {
  const patientId = req.params.id;

  const { fName, lName, nationalID, gender, dateOfBirth, relationship } = req.body;


  const validRelationships = ["wife", "husband", "son", "daughter"];

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

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


// Patient can view list of all prescriptions req #54 sprint #1
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

    res.json({prescriptions : prescriptions},{doctorsSet});
  } catch (err) {
    // Handle errors, for example, database connection issues
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


// Filter Prescriptions based on date or doctor or filled or unfilled req #55 sprint #1
const filterThePrescription = async (req, res) => {
  const patientId = req.params.id;
  try {
    const filter = {};

    if (req.query.doctor) {
      const doctorWithSpecificUsername = await Doctor.findOne({
        username: req.query.doctor,
      });
      filter.doctor = doctorWithSpecificUsername;
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
 


// Patient can select a prescription from his/her list of prescriptions req #56 sprint #1
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


// Patient can view upcoming appoinments sprint #2
const viewUpcomingAppointments = async (req, res) => {
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

    
    const appointments = await Appointments.find({
      patient: patientId, status : "upcoming"
    }).populate("doctor");

    res.json({appointments : appointments});
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};







const viewPastAppointments = async (req, res) => {
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

    
    const appointments = await Appointments.find({
      patient: patientId, status : "past"
    }).populate("doctor");

    res.json({appointments : appointments});
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


// Patient can view health records sprint #2
const getHealthRecords = async (req, res) => {
  try {
    const patientID = req.params.id; 
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res
        .status(404)
        .json({ message: "No patient" });
    }

    // Extract family members from the patient object
    const medicalHistory = patient.medicalHistory;

    res.json(medicalHistory);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getAllDoctors = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);
    const patientPackage = patient.subscribedPackage;

    let sessionDiscount = 0;
    if (patientPackage) {
      const packageOffered = await Package.findOne({ name: patientPackage });
      if (packageOffered) {
        sessionDiscount = packageOffered.sessionDiscount || 0;
      }
    }

    const doctors = await Doctor.find().lean();

    const doctorsDisplay = doctors.map((doctor) => {
      const originalSessionPrice = doctor.sessionPrice;
      const discountedPrice =
        originalSessionPrice -
        (originalSessionPrice * (sessionDiscount / 100));
      return {
        id: doctor._id,
        username : doctor.username,
        fName: doctor.fName ,
        lName :  doctor.lName,
        specialty: doctor.specialty,
        sessionPrice: discountedPrice,
      };
    });

    res.json({ userID: patientID, doctors: doctorsDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};







const filterAppointments = async (req, res) => {
  const patientId = req.params.id;
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.params.id) {
      filter.patient = patientId;
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

    const appointments = await Appointments.find(filter).populate("doctor");


    res.json({appointments : appointments});
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
  selectPrescription,
  viewUpcomingAppointments,
  getHealthRecords,
  getAllDoctors,
  viewPastAppointments,
  filterAppointments
};