import express from "express";
import { createPatient,  searchForDoctor, filterAvailableAppointments ,filtermyAppointments, filterDoctors ,selectDoctor } from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);

// Search for a doctor by name/specialty
router.get("/searchForDoctors" , searchForDoctor);

// Filter available appointments by date and status
router.get("/filterAvailableAppointments", filterAvailableAppointments);

// Filter my appointments by date and status
router.get("/filtermyAppointments/:id", filtermyAppointments);

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get("/filterDoctors",filterDoctors);

//select a doctor from the search/filter results (dependent on 37)
router.get("/selectDoctor/:id",selectDoctor);

export default router;
