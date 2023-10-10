import express from "express";
import { createPatient,viewPrescription,addFamMem ,selectPres,filterDoctors,filterthepresc} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);
router.get("/viewPrescription/:id",viewPrescription);
router.post("/addFamMem/:id",addFamMem);
router.get("/selectPres/:id",selectPres);
router.get("/filterDoctors",filterDoctors);
router.get("/filterthepresc/:id",filterthepresc);




export default router;
