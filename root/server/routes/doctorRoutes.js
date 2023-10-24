  import express from "express";
  import {searchForPatient ,addAppointment, filterMyAppointments ,upcomingAppointments, getMyPatients} from "../controllers/doctorController.js";

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

  export default router;