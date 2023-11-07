import express from "express";
import {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
  getAllAdmins,
  getAllPackages,
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors,
  getAllDoctors,
  getAllPatients,
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/addAdmin/:id", createAdmin);
router.get("/packageManagement/:id", getAllPackages);
router.post("/packageManagement/:id", createPackage);
router.delete("/packageManagement/:userid/:packageid", deletePackage);
router.patch("/packageManagement/:userid/:packageid", updatePackage);
router.get("/allAdmins", getAllAdmins);

//LOJAINS ROUTES
router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.get("/viewUnregisteredDoctors/:id", viewUnregisteredDoctors);
router.get("/deleteDoctor/:id", getAllDoctors);
router.get("/deletePatient/:id", getAllPatients);

export default router;
