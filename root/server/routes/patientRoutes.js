import express from "express";
import { createPatient, getFamilyMembers, getAllDoctors, getSingleDoctor } from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();


// post request to create a patient
router.post("/registeration", createPatient);

router.get('/familyMembers',getFamilyMembers );
router.get('/viewDoctors', getAllDoctors);
router.get('/selectdoctor/:id',getSingleDoctor);
export default router;
