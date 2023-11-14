import express from "express";
import multer from "multer";
import path from "path";
import {
    viewUpcomingAppointments,getHealthRecords,addAvailableAppointments,viewContract,acceptContract,
    filterAppointments,viewPastAppointments,viewAppointments,uploadDocument,
    removeDocument
    } from "../controllers/doctorController.js";
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

router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/viewPastAppointments/:id", viewPastAppointments);
router.get("/viewAppointments/:id", viewAppointments);
router.get("/getHealthRecords/:id", getHealthRecords);
router.get("/filterAppointments/:id", filterAppointments);
router.post("/addAvailableAppointments/:id", addAvailableAppointments);
router.get("/viewContract/:id", viewContract);
router.patch("/acceptContract/:id", acceptContract);
router.post("/uploadDocument/:id", upload.single("file"), uploadDocument);
router.patch("/removeDocument/:patientid/:documentid", removeDocument);



export default router;