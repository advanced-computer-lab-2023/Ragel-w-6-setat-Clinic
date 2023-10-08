  import express from "express";
  import {searchForPatient ,addAppointment, filterMyAppointments ,upcomingAppointments} from "../controllers/doctorController.js";

  import { body, validationResult } from "express-validator";

  const router = express.Router();

  // Search for a patient by name
  router.get('/searchForPatients', searchForPatient)

  // post request to add an appointment
  router.post("/addAppointment", addAppointment);

  //Filter my appointments by date and status
  router.get("/filterMyAppointments", filterMyAppointments);

  // Filter patients based on upcoming appointments with the doctor
  router.get("/upcomingappointments", upcomingAppointments)

  export default router;