import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  doctorDetails,
  searchForPatient,
  filterMyAppointments,
  upcomingAppointments,
  getMyPatients,
  getSinglePatient,
  getMyAppointments,
  scheduleFollowUp,
  getWalletAmount,
  rescheduleAppointment,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// HABIBAS ROUTES

router.post("/registeration", createDoctor);
router.patch("/updateProfile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorProfile/:id", doctorDetails);
router.post("/scheduleFollowUp/:doctorid/:patientid", scheduleFollowUp);
router.get("/myWalletAmount/:id", getWalletAmount);

// MARIAMS ROUTES

router.get("/searchForPatients/:id", searchForPatient);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/upcomingappointments/:id", upcomingAppointments);
router.get("/getMyAppointments/:id", getMyAppointments);

//SARAS ROUTES

router.get("/selectedPatient/:doctorid/:patientid", getSinglePatient);
router.get("/viewMyPatients/:id", getMyPatients);
router.patch("/rescheduleAppointment/:appointmentid", rescheduleAppointment);
export default router;
