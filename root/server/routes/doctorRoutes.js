import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  renderHomePage,
  renderRegisterationPage,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/registeration", renderRegisterationPage);
router.post("/registeration", createDoctor);
router.patch("/profile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorHome/:id", renderHomePage);

export default router;
