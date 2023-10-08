import express from "express";
import { body, validationResult } from "express-validator";
import { deleteAdmin,deleteDoctor,deletePatient,viewDoctors } from "../controllers/adminController.js";

const router = express.Router();


router.delete("/deletePatient", deletePatient);
router.delete("/deletePatient", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.get("/viewDoctors", viewDoctors);

export default router;