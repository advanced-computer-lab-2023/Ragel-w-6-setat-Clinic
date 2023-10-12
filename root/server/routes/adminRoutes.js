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
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create an admin
router.get("/addAdmin/:id", renderAddAdminPage);
router.post("/addAdmin/:id", createAdmin);
router.get("/packageManagement/:id", renderPackagePage);
router.post("/packageManagement/:id", createPackage);
router.delete("/packageManagement/:userid/:packageid", deletePackage);
router.patch("/packageManagement/:userid/:packageid", updatePackage);
router.get("/allAdmins", getAllAdmins);
router.get("/adminHome/:id", renderHomePage);

//LOJAINS ROUTES
router.delete("/deleteAdmin", deleteAdmin);
router.delete("/deletePatient", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.get("/viewUnregisteredDoctors", viewUnregisteredDoctors);

export default router;
