import express from "express";
import multer from "multer";
import path from "path";
import { addFamilyMember,
    viewPrescription,
    filterThePrescription,
    viewUpcomingAppointments,
    selectPrescription,
    getHealthRecords,
    getAllDoctors,viewPastAppointments,
    filterAppointments,viewAppointments, uploadDocument,
    removeDocument,
    getMedicalHistory
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      ); //Appending extension
    },
  });
  
  const upload = multer({ storage: storage });

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
router.post("/uploadDocument/:id", upload.single("file"), uploadDocument);
router.get("/myMedicalHistory/:id", getMedicalHistory);
router.patch("/removeDocument/:patientid/:documentid", removeDocument);






export default router;
