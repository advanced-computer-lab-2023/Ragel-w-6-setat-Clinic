import express from "express";
import { createPatient,viewPrescription,filteredPresc,addFamMem ,selectPres} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);
router.get("/viewPrescription/:id",viewPrescription);
router.get("/filteredPresc",filteredPresc);
router.post("/addFamMem/:id",addFamMem);
router.get("/selectPres/:id",selectPres);



export default router;
