import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  renderHomePage,
  renderRegisterationPage,
  renderProfilePage,
  searchForPatient,
  filterMyAppointments,
  upcomingAppointments,
  getMyPatients,
  getSinglePatient,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/registeration", renderRegisterationPage);
router.post("/registeration", createDoctor);
router.patch("/doctorProfile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorHome/:id", renderHomePage);
router.get("/doctorProfile/:id", renderProfilePage);

// MARIAMS ROUTES

router.get("/searchForPatients/:id", searchForPatient);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/upcomingappointments/:id", upcomingAppointments);

//SARAS ROUTES

router.get("/selectedPatient/:doctorid/:patientid", getSinglePatient);
router.get("/viewMyPatients/:id", getMyPatients);

export default router;
