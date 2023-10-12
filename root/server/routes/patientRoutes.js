import express from "express";
import {
  createPatient,
  viewPrescription,
  getAllPatients,
  renderHomePage,
  renderRegisterationPage,
  addFamMem,
  filterThePrescription,
  selectPrescription,
  filterDoctors,
  searchForDoctor,
  filterMyAppointments,
  filterAvailableAppointments,
  selectDoctor,
  getFamilyMembers,
  getAllDoctors,
  getSingleDoctor,
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/registeration", renderRegisterationPage);
router.post("/registeration", createPatient);
router.get("/allPatients", getAllPatients);
router.get("/patientHome/:id", renderHomePage);

// LOJAINS ROUTES
router.post("/addFamMem/:id", addFamMem);
router.get("/viewPrescription/:id", viewPrescription);
router.get("/filterThePrescription/:id", filterThePrescription);
router.get("/selectPrescription/:id", selectPrescription);

// MARIAMS ROUTES
router.get("/searchForDoctors/:id", searchForDoctor);
router.get("/filterAvailableAppointments", filterAvailableAppointments);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/filterDoctors/:id", filterDoctors);
router.get("/doctorDetails/:patientid/:doctorid", selectDoctor);

// SARA ROUTES

router.get("/familyMembers/:id", getFamilyMembers);
router.get("/viewDoctors/:id", getAllDoctors);
router.get("/selectDoctor/:id", getSingleDoctor);

export default router;
