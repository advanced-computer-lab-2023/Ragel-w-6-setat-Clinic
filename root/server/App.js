import mongoose from "mongoose";
import Patient from "./models/Patient.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointments.js";
import Admin from "./models/Admin.js";

const uri =
  "mongodb+srv://habibahilal:Hh8668669@cluster0.v2gsdne.mongodb.net/virtual_clinic?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    const patient = new Patient({
      Username: "habibahilal",
      Password: "Hh8668669",
      Email: "habibahilal@yahoo.com",
      fName: "Habiba",
      lName: "Hilal",
      DateOfBirth: new Date("1999-01-01"),
      Gender: "female",
      PhoneNum: "01000000000",
      EmergencyContact: {
        phoneNum: "01000000000",
        fName: "Lojain",
        lName: "Tarek",
      },
    });
    //patient.save().then(() => console.log("Patient added successfully!"));

    const doctor = new Doctor({
      Username: "mohamedhassan",
      Password: "Hh8668669",
      Email: "mohamedhassan@gmail.com",
      fName: "Mohamed",
      lName: "Hassan",
      DateOfBirth: new Date("1999-01-01"),
      EducationalBackground: "Cairo University",
      HourlyRate: 100,
      Affiliation: "Cairo University",
      Specialty: "Dentist",
    });
    //doctor.save().then(() => console.log("Doctor added successfully!"));

    const appointment = new Appointment({
      Patient: patient._id,
      Doctor: doctor._id,
      Date: new Date("2021-05-01"),
      Time: "10:00",
      isAvailable: true,
      Status: "upcoming",
    });
    // appointment
    //   .save()
    //   .then(() => console.log("Appointment added successfully!"));

    let pat;

    async function findPatientAndAppointment() {
      try {
        // Find the patient with username 'habibahilal'
        pat = await Patient.findOne({ Username: "habibahilal" }).lean();

        if (pat) {
          // Find the appointment with the patient's _id
          const appointment = await Appointment.findOne({
            Patient: pat._id,
          }).populate("Patient");

          if (appointment) {
            console.log("Appointment with Patient Details:", appointment);
          } else {
            console.log("Appointment not found for the patient.");
          }
        } else {
          console.log("Patient not found.");
        }
      } catch (error) {
        console.error(error);
      }
    }

    findPatientAndAppointment();
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
