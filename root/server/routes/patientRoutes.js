import express from "express";
import { addFamilyMember,
    viewPrescription,
    filterThePrescription,
    selectPrescription} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient

router.post("/addFamilyMember/:id", addFamilyMember);
router.get("/viewPrescription/:id", viewPrescription);
router.get("/filterThePrescription/:id", filterThePrescription);
router.get("/selectPrescription/:patientid/:prescriptionid",selectPrescription);





export default router;
