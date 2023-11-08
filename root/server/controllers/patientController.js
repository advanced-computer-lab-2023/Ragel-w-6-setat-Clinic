import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Package from "../models/Package.js";
// create (register) a patient

// m2 requirements :
/*async function getMyHealthPackages(req, res) {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID)//.populate("familyMembers");

    if (!patient) {
      return res.status(404).json({ message: "There is no patient with this id" });
    }

    const subscribedPackage = patient.subscribedPackage;
    //const familyMembers = patient.familyMembers.map((member) => ({
      //subscribedPackage: member.subscribedPackage,
    //}));

    if (!subscribedPackage /*&& familyMembers.length === 0) {
      return res.status(404).json({ message: "There is no subscribed package" });
    } else {
      console.log({ subscribedPackage });
      res.status(200).json({ subscribedPackage});
  }
}
   catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });

};
}*/


//req 28
const subscribeToHealthPackage = async (req, res) => {
    const patientId = req.params.id;
    const { packageName, subscriptionStatus, renewalDate, cancellationDate } =
      req.body;
      try {
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({
          status: "fail",
          message: "Patient not found",
        });
      }
      
      if (patient.subscribedPackage && patient.subscribedPackage.length > 0) {
        return res.status(400).json({ message: 'Patient is already subscribed to a health package' });
      }
      const newPackage = {
  
        packageName,  
        subscriptionStatus,
        renewalDate,
        cancellationDate,
      };
  
      patient.subscribedPackage.push(newPackage);
      await patient.save();
      res.status(200).json({ message: 'Subscription successful' });  
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


//req 31
const statusHealth = async (req, res) => {  
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "There is no patient with this id" });
    }
    const subscribedPackage = patient.subscribedPackage;
    console.log(subscribedPackage);
    if (!subscribedPackage || subscribedPackage.length === 0){
      return res.status(404).json({ message: "The patient is not subscribed to any health package" });
    } else {
      const healthCareStatus = {
        self: {
          packageName: patient.subscribedPackage[0].packageName,
          subscriptionStatus: patient.subscribedPackage[0].subscriptionStatus,
          renewalDate: patient.subscribedPackage[0].renewalDate,
          cancellationDate: patient.subscribedPackage[0].cancellationDate,
        }
      };
      res.status(200).json({ healthCareStatus });
    }
    
  }
    catch (error) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };


  //req 30
const getMyHealthPackages =  async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(404).json({ message: "There is no patient with this id" });
    }

    const subscribedPackage = patient.subscribedPackage;

    if (!subscribedPackage) {
      return res.status(404).json({ message: "The patient is not subscribed to any health package" });
    } else {
      res.status(200).json({ message: `The patient is subscribed to the ${subscribedPackage} health package.` });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}





async function createPatient(req, res) {
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
}

const getFamilyMembers = async (req, res) => {
  try {
    const patientID = req.params.id; 

    
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(404).json({ message: "There are no Family Members registered" });
    }

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers;

    res.status(200).json(familyMembers);
   
    
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
      const discountedPrice = originalSessionPrice - (originalSessionPrice * (sessionDiscount / 100));
      return {
        name: doctor.fName + " " + doctor.lName,
        specialty: doctor.specialty,
        sessionPrice: discountedPrice,
      };
    });

    res.json({userID: patientID , doctors: doctorsDisplay});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



  const getSingleDoctor = async (req, res) => {
   
    app.get('/doctors/:doctorId/details', async (req, res) => {
      try{
      const  doctorID  = req.params.doctorid;
      const patientID = req.params.userid;
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
    res.json({userID:patientID, doctor: modifiedDoctor });
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  };





export { createPatient, getFamilyMembers, getAllDoctors, getSingleDoctor, getMyHealthPackages, statusHealth, subscribeToHealthPackage};


