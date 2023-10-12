import express from "express";
import { createPatient,viewPrescription,addFamMem ,selectPres,filterDoctors,filterthepresc} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);
router.post("/familyMembers/:id",addFamMem);
router.get("/viewPrescription/:id",viewPrescription);
router.get("/viewPrescription/:id",filterthepresc);
router.get("/selectedPrescription/:patientid/:id",selectPres);
router.get("/filterDoctors",filterDoctors);





export default router;
