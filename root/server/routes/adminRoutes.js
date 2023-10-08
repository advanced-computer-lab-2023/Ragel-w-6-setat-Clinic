import express from "express";
import {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
} from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create an admin
router.post("/registeration", createAdmin);
router.post("/package", createPackage);
router.delete("/package/:id", deletePackage);
router.patch("/package/:id", updatePackage);

export default router;
