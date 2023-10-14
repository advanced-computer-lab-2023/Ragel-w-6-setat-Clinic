import express from "express";
import {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
  getAllAdmins,
  renderHomePage,
  renderAddAdminPage,
  renderPackagePage,
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors,
  renderDeleteAdminPage,
  renderDeleteDoctorPage,
  renderDeletePatientPage,
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/addAdmin/:id", renderAddAdminPage);
router.post("/addAdmin/:id", createAdmin);
router.get("/packageManagement/:id", renderPackagePage);
router.post("/packageManagement/:id", createPackage);
router.delete("/packageManagement/:userid/:packageid", deletePackage);
router.patch("/packageManagement/:userid/:packageid", updatePackage);
router.get("/allAdmins", getAllAdmins);
router.get("/adminHome/:id", renderHomePage);

//LOJAINS ROUTES
router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.get("/viewUnregisteredDoctors/:id", viewUnregisteredDoctors);
router.get("/deleteAdmin/:id", renderDeleteAdminPage);
router.get("/deleteDoctor/:id", renderDeleteDoctorPage);
router.get("/deletePatient/:id", renderDeletePatientPage);

export default router;
