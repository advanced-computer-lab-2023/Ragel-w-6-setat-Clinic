import express from "express";
import { createDoctor } from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a doctor
router.post("/registeration", createDoctor);

export default router;
