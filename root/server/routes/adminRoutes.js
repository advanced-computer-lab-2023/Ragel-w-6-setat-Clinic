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
  setToRegistered,
  rejectDoctor,
  getAdmin,
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

import { requireAuthAdmin } from "../middlewares/requireAuthAdmin.js";

const router = express.Router();

//require auth
router.use(requireAuthAdmin);

router.get("/adminDetails/:id", getAdmin);
router.post("/addAdmin/:id", createAdmin);
router.get("/getAllPackages/:id", getAllPackages);
router.post("/packageManagement/:id", createPackage);
router.delete("/packageManagement/:userid/:packageid", deletePackage);
router.patch("/packageManagement/:userid/:packageid", updatePackage);
router.get("/allAdmins/:id", getAllAdmins);

//LOJAINS ROUTES
router.delete("/deleteAdmin/:adminId/:adminUser", deleteAdmin);
router.delete("/deletePatient/:adminId/:patientUser", deletePatient);
router.delete("/deleteDoctor/:adminId/:doctorUser", deleteDoctor);
router.get("/viewUnregisteredDoctors/:id", viewUnregisteredDoctors);
router.get("/allDoctors/:id", getAllDoctors);
router.get("/allPatients/:id", getAllPatients);
router.patch("/setToRegistered/:id", setToRegistered);
router.delete("/rejectDoctor/:id", rejectDoctor);

export default router;
