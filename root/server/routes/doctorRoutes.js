import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  renderHomePage,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a doctor
router.post("/registeration", createDoctor);
router.patch("/profile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorHome/:id", renderHomePage);

export default router;
