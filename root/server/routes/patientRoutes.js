import express from "express";
import { addFamilyMember,
    viewPrescription,
    filterThePrescription,
    viewUpcomingAppointments,
    selectPrescription,
    getHealthRecords,
    getAllDoctors,viewPastAppointments,
    filterAppointments,viewAppointments
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient

router.post("/addFamilyMember/:id", addFamilyMember);
router.get("/viewPrescription/:id", viewPrescription);
router.get("/filterThePrescription/:id", filterThePrescription);
router.get("/selectPrescription/:patientid/:prescriptionid",selectPrescription);
router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/viewPastAppointments/:id", viewPastAppointments);
router.get("/getHealthRecords/:id", getHealthRecords);
router.get("/getAllDoctors/:id", getAllDoctors);
router.get("/filterAppointments/:id", filterAppointments);
router.get("/viewAppointments/:id", viewAppointments);





export default router;
