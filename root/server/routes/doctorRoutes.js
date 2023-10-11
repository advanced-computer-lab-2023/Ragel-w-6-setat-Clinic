import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  renderHomePage,
  renderRegisterationPage,
  renderProfilePage,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/registeration", renderRegisterationPage);
router.post("/registeration", createDoctor);
router.patch("/doctorProfile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorHome/:id", renderHomePage);
router.get("/doctorProfile/:id", renderProfilePage);

export default router;
