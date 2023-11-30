import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointments.js";
import Prescription from "../models/Prescription.js";
import mongoose from 'mongoose'


const searchForPatient =  async( req , res ) =>{
  const { fName, lName } = req.query;
  try {
    const patients = await Patient.find({
      $or: [
        { fName: fName},
        { lName: lName},
      ],
    });
    console.log(patients);

    if (patients.length === 0) {
      res.status(404).json({ error: 'Patients not found' });
    } else {
      res.status(200).json(patients);
     
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }  
};

//--sprint 2
//add an appointment
const addAppointment = async (req, res) => {
  try {
     const appointment = await Appointment.create({
      ...req.body,
    });
    res.status(201).json({
      status: "success",
      data: {
        appointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const filterMyAppointments = async (req, res) => {
  const  doctorId  = req.params.id; // Get doctotId from URL parameter
  try {
    const filter = {};

    if(req.body.date)
    {
      filter.date = req.body.date;
    }
    if(req.body.status)
    {
      filter.status = req.body.status;
    }
    if(req.params.id)
    {
      filter.doctor = req.params.id;
    }
    const appointments = await Appointment.find(filter);
      res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const upcomingAppointments = async(req, res) =>{
  const  doctorId  = req.params.id;
  try{
    const upcomingAppointments = await Appointment.find({
      doctor: doctorId,
      status: 'upcoming',
    //  date: { $gte: new Date() }, // Filter for appointments with dates in the future
    });
    const patientIds = upcomingAppointments.map((Appointment) => {
      return Appointment.patient; 
    });
    // Find patients based on their IDs using Promise.all
    const patientsWithUpcomingAppointments = await Promise.all(
      patientIds.map(async (patientId) => {
        return await Patient.findById(patientId);
      })
    );
    res.json({
      data: patientsWithUpcomingAppointments, 
    });
   /* res.render('upcomingappointments', {
      data: patientsWithUpcomingAppointments,
      userId: doctorId, 
    });*/
  }catch(error){    
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const getMyPatients = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient');
    const doctorPatients = [];
    
    for (const appointment of appointments) {
      if (appointment.patient !== null) {
        const patientId = appointment.patient;
        try {
          const patient = await Patient.findById(patientId).exec();
          doctorPatients.push(patient);
        } catch (error) {
          console.error('Error finding patient:', error);
        }
      }
    }

    res.json(doctorPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


//----------------------------------------------------------sprint 3--------------------------------------------------------------//

const viewAllPrescription = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const allPrescriptions = await Prescription.find({ doctor: doctorId });
    if (!allPrescriptions || allPrescriptions.length === 0) {
      return res.status(404).json({ error: 'No prescriptions found for the specified doctor' });
    }

    const prescriptionsWithStatus = allPrescriptions.map((prescription) => {
      return {
        medicines: prescription.medicines.map((medicine) => {
          return {
            name: medicine.name,
            dosage: medicine.dosage,
          };
        }),
        isFilled: prescription.isFilled,
        date: prescription.date,
        notes: prescription.notes,
      };
    });

    res.json(prescriptionsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addDosage = async (req, res) => {
  const doctorId = req.params.id;
  const { name, dosage } = req.body;
  try {
    const prescription = await Prescription.findOne({doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToUpdate = prescription.medicines.find((medicines) => medicines.name === name);
    console.log(medicineToUpdate);
    if (!medicineToUpdate) {
      return res.status(404).json({ message: 'Medicine not found in the prescription' });
    }
    medicineToUpdate.dosage = dosage;
    await prescription.save();
    res.json({ message: 'Dosage updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addMedicine = async (req, res) => {
  const doctorId = req.params.id;
  const { name, dosage } = req.body;
  try {
    const prescription = await Prescription.findOne({ doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToAdd = prescription.medicines.find((medicines) => medicines.name === name);
    if (medicineToAdd) {
      return res.status(404).json({ message: 'Medicine already exists in the prescription' });
    }
    const newMedicine = { name, dosage };
    prescription.medicines.push(newMedicine);    
    await prescription.save();
    res.json({ message: 'Medicine added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteMedicine = async (req, res) => {
  const doctorId = req.params.id;
  const { name } = req.body;
  try {
    const prescription = await Prescription.findOne({ doctor: doctorId });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for the specified doctor' });
    }
    const medicineToDelete = prescription.medicines.find((medicines) => medicines.name === name);
    if (!medicineToDelete) {
      return res.status(404).json({ message: 'Medicine not found in the prescription' });
    }
    prescription.medicines = prescription.medicines.filter((medicine) => medicine.name !== name);
    await prescription.save();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
   searchForPatient,
   addAppointment, 
   filterMyAppointments, 
   upcomingAppointments,
   getMyPatients,
   viewAllPrescription,
   addDosage,
   addMedicine,
   deleteMedicine
  };
