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
    getEducationalBackground,setToRegistered
} from "../controllers/adminController.js";

const router = express.Router();


router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.get("/viewUnregisteredDoctors/:id", viewUnregisteredDoctors);
router.get("/getEducationalBackground/:id", getEducationalBackground);
router.patch("/setToRegistered/:id", setToRegistered);

export default router;