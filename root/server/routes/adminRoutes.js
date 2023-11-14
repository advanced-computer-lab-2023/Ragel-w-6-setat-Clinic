import express from "express";
import {
    body,
    validationResult
} from "express-validator";
import {
    deleteAdmin,
    deleteDoctor,
    deletePatient,
    viewUnregisteredDoctors,
    getEducationalBackground
} from "../controllers/adminController.js";

const router = express.Router();


router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.get("/viewUnregisteredDoctors/:id", viewUnregisteredDoctors);
router.get("/getEducationalBackground/:id", getEducationalBackground);

export default router;