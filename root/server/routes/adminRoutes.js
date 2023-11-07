import express from "express";
import {
    body,
    validationResult
} from "express-validator";
import {
    deleteAdmin,
    deleteDoctor,
    deletePatient,
    viewUnregisteredDoctors
} from "../controllers/adminController.js";

const router = express.Router();


router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.get("/viewUnregisteredDoctors", viewUnregisteredDoctors);

export default router;