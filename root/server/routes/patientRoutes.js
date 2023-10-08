import express from "express";
import { createPatient, getFamilyMembers } from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();


// post request to create a patient
router.post("/registeration", createPatient);

router.get('/familyMembers',getFamilyMembers );

export default router;
