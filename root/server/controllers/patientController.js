import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";
import Package from "../models/Package.js";
import CreditCard from "../models/CreditCard.js";
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

 const searchForDoctor = async (req, res) =>{
  const { fName, lName, specialty } = req.query;
  try {
    const doctors = await Doctor.find({
      $or: [
        { fName: fName},
        { lName: lName},
        {specialty: specialty},
      ],
    });
    console.log(doctors);

    if (doctors.length === 0) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.status(200).json(doctors);
     
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
        filter.date = req.query.date;
      }

      if(req.query.status)
      {
        filter.status = req.query.status;
      }

      if(req.params.id)
      {
        filter.patient = req.params.id;
      }

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
    const specialty = req.query.specialty
    const patientId = req.params.id;
    const date = req.query.date;
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

    //const doctorsToDisplay = await doctorsDisplay(patientID, doctors);

    res.json(doctors);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
    const { email, relationship } = req.body;
    const patientId = req.params.id;
    const requestingPatient = await Patient.findById(patientId);

    if (!requestingPatient) {
      return res.status(404).json({ error: 'Requesting patient not found' });
    }

    const existingPatient = await Patient.findOne({email});
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
    
    const { fName, lName, nationalID, gender ,dateOfBirth } = existingPatient;
    requestingPatient.familyMembers.push({
      email: existingPatient.email,
      fName,
      lName,
      nationalID,
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

const payAppointmentWallet = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const appointment = await Appointments.findOne({
      patient: patientId,
      status: 'available', 
    });
    if (!appointment) {
      return res.status(400).json({ error: 'No pending appointment for this patient' });
    }
    const paymentAmount = appointment.price; 
      if (patient.wallet >= paymentAmount) {
        patient.wallet -= paymentAmount;
        await patient.save();
        appointment.status = 'upcoming';
        await appointment.save();
        return res.status(200).json({ message: 'Payment successful from wallet' });
      } else {
        return res.status(400).json({ error: 'Insufficient wallet balance' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
   /* } else if (paymentMethod === 'creditCard') {
      // Check if the patient has a credit card
      const creditCard = await CreditCard.findOne({ patient: patientId });

      if (!creditCard) {
        return res.status(400).json({ error: 'No credit card on file' });
      }

      // Process the payment with the credit card (you may need to integrate a payment gateway)
      // If the payment is successful, update the appointment status
      // You would typically use a payment gateway library to handle credit card payments

      return res.status(200).json({ message: 'Payment successful with credit card' });
    } else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }*/
  };

//stripe payment still not complete 
 const payAppointmentCreditCard = async (req, res) => {
  const { cardNumber, expirationDate, securityCode, name, appointmentCost } = req.body;
  // dont foeget to add STRIPE_SECRET_KEY=sk_test_your_actual_secret_key in .ENV
  try {
    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointmentCost * 100, // Amount in cents (Stripe expects the amount in cents)
      currency: 'usd',
      description: 'Appointment Payment',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment creation failed:', error);
    res.status(500).json({ message: 'Payment creation failed' });
  }
 }
  
export { 
  createPatient, 
  searchForDoctor,
  filterAvailableAppointments,
  filtermyAppointments,
  filterDoctors,
  selectDoctor,
  getAllDoctors,
  viewPrescription,
  viwHealthPackages,
  linkFamilyMember,
  payAppointmentWallet,
  payAppointmentCreditCard
 };
