import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Package from "../models/Package.js";
// create (register) a patient


const renderViewAllDoctors = function (req,res) {
  const patientID = req.params.id;
  
};

const renderSelectedDoctor = function (req,res){
  const patientID = req.params.id;
  res.render("selectedDoctor",{userID:patientID});
};


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

const getFamilyMembers = async (req, res) => {
  try {
    const patientID = req.params.id; // Get patient's email from the request body


    // Find the patient using the provided email in the familyMembers array
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(404).json({ message: 'There are no Family Members registered' });
    }

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers;

    res.render('viewFamily.ejs', {userID: patientID, patientFamily: familyMembers});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

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
      const discountedPrice = originalSessionPrice - (originalSessionPrice * (sessionDiscount / 100));
      return {
        name: doctor.fName + " " + doctor.lName,
        specialty: doctor.specialty,
        sessionPrice: discountedPrice,
      };
    });

    res.render("allDoctors", {userID: patientID , doctors: doctorsDisplay});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



  const getSingleDoctor = async (req, res) => {
    try {
      
      const  doctorID  = req.body.id;
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
      const doctor = await Doctor.findById(doctorID);
      const originalSessionPrice = doctor.sessionPrice;
      const discountedPrice = originalSessionPrice - (originalSessionPrice * (sessionDiscount / 100));
      if (!doctor) {
        return res.status(404).json({ message: 'doctor not found' });
      }
      const modifiedDoctor = {
        ...doctor.toObject(), // Convert Mongoose document to plain JavaScript object
        sessionPrice: discountedPrice // Replace sessionPrice with discountedPrice
    };
    
    res.json(modifiedDoctor);
    
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  


export { createPatient, getFamilyMembers, getAllDoctors, getSingleDoctor };


