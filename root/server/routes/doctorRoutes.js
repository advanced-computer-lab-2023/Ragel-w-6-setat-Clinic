import express from "express";
import {
  createDoctor,
  updateDoctorProfile,
  getMyPatients,
  getSinglePatient,

} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();
//get req to view patients health records and patients registered with them
//requirement no 25
// post request to create a doctor

// select only one patient 
router.get('/selectpatient/:id',getSinglePatient);
// view all mypatients 
router.get('/viewMypatients/:id', getMyPatients);

router.post("/registeration", createDoctor);

router.patch("/profile/:id", updateDoctorProfile);

export default router;
