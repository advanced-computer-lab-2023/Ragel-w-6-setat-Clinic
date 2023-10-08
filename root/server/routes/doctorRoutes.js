import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getAllPatients,

} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();
//get req to view patients health records and patients registered with them
//requirement no 25
// post request to create a doctor


// view all mypatients 
router.get('/viewpatients', getAllPatients);

router.post("/registeration", createDoctor);

router.patch("/profile/:id", updateDoctorProfile);

export default router;
