import express from "express";
import {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
  getAllAdmins,
  renderHomePage,
  renderAddAdminPage,
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create an admin
router.get("/addAdmin/:id", renderAddAdminPage);
router.post("/addAdmin", createAdmin);
router.post("/package", createPackage);
router.delete("/package/:id", deletePackage);
router.patch("/package/:id", updatePackage);
router.get("/allAdmins", getAllAdmins);
router.get("/adminHome/:id", renderHomePage);

export default router;
