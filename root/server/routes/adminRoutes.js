import express from "express";
import { createAdmin, createPackage } from "../controllers/adminController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create an admin
router.post("/registeration", createAdmin);
router.post("/packages", createPackage);

export default router;
