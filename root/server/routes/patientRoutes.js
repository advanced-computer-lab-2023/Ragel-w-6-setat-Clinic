import express from "express";
import { createPatient, getFamilyMembers, getAllDoctors, getSingleDoctor, getMyHealthPackages, statusHealth, subscribeToHealthPackage, paySubscriptiontWallet } from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();


// post request to create a patient
router.post("/registeration", createPatient);
router.get('/familyMembers/:id',getFamilyMembers );
router.get("/viewDoctors/:id", getAllDoctors);
router.get('/healthPackages/:id', getMyHealthPackages);
router.get('/healthStatus/:id', statusHealth);
router.post('/subscribe/:id', subscribeToHealthPackage);
router.post('/subscribedWallet/:id', paySubscriptiontWallet);

export default router;



