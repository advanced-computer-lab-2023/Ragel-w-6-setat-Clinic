import express from "express";
import {
  createPatient,
  viewPrescription,
  getAllPatients,
  renderHomePage,
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);
router.get("/viewPrescription/:id", viewPrescription);
router.get("/allPatients", getAllPatients);
router.get("/patientHome/:id", renderHomePage);

export default router;
