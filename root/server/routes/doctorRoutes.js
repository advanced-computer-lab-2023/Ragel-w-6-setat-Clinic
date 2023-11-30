  import express from "express";
  import {searchForPatient ,addAppointment, filterMyAppointments ,upcomingAppointments, getMyPatients, viewAllPrescription, addDosage , addMedicine, deleteMedicine} from "../controllers/doctorController.js";

  import { body, validationResult } from "express-validator";

  const router = express.Router();

  // Search for a patient by name
  router.get('/searchForPatients', searchForPatient)

  // post request to add an appointment
  router.post("/addAppointment", addAppointment);

  //Filter my appointments by date and status
  router.get("/filterMyAppointments/:id", filterMyAppointments);

  // Filter patients based on upcoming appointments with the doctor
  router.get("/upcomingappointments/:id", upcomingAppointments)

  router.get('/viewMypatients/:id', getMyPatients);

//----------------------------------------------------------sprint 3--------------------------------------------------------------//


//view all new and old prescriptions and their statuses (filled/ not filled)
router.get("/viewAllPrescriptions/:id",viewAllPrescription);  

//add/update dosage for each medicine added to the prescription
 router.post("/addDosage/:id", addDosage);

 //add medicine to/from the prescription from the pharmacy platform
 router.post("/addMedicine/:id", addMedicine);

//delete medicine to/from the prescription from the pharmacy platform
router.delete("/deleteMedicine/:id", deleteMedicine);

  export default router;