import express from "express";
import { createPatient,  searchForDoctor} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);

// Search for a doctor by name/specialty
router.get("/searchForDoctors" , searchForDoctor);



export default router;
