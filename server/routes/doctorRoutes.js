import express from "express";
import multer from "multer";
import path from "path";
import {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  doctorDetails,
  searchForPatient,
  filterMyAppointments,
  upcomingAppointments,
  getMyPatients,
  getSinglePatient,
  getMyAppointments,
  scheduleFollowUp,
  getWalletAmount,
  viewUpcomingAppointments,
  viewPastAppointments,
  addAvailableAppointments,
  uploadDocumentForPatient,
  getMedicalHistoryForPatient,
  registerDoctor,
  viewAllPrescription,
  downloadPrescriptionPDF,
  filterThePrescription,
  selectPrescription,
  rescheduleAppointment,
  cancelAppointmentforPatient,
  pendingReq,
  acceptRequest,
  rejectRequest,
  getAllMedicines,
  createPrescription,
  updatePrescription,
  changeDoctorPassword,
  getUserById,
  getDoctorNotifications,
  createAppointmentNotifications,
} from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";
import { requireAuthDoctor } from "../middlewares/requireAuthDoctor.js";

// multer
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

//require auth
router.use(requireAuthDoctor);

// HABIBAS ROUTES

router.post("/registeration", createDoctor);
router.post(
  "/register",
  upload.fields([
    { name: "fileID", maxCount: 1 },
    { name: "fileMedicalLicense", maxCount: 1 },
    { name: "fileMedicalDegree", maxCount: 1 },
  ]),
  registerDoctor
);
router.patch("/updateProfile/:id", updateDoctorProfile);
router.get("/allDoctors", getAllDoctors);
router.get("/doctorProfile/:id", doctorDetails);
router.post("/scheduleFollowUp/:doctorid/:patientid", scheduleFollowUp);
router.get("/myWalletAmount/:id", getWalletAmount);
router.post(
  "/uploadDocumentForPatient/:doctorid/:patientid",
  upload.single("file"),
  uploadDocumentForPatient
);
router.get(
  "/patientMedicalHistory/:doctorid/:patientid",
  getMedicalHistoryForPatient
);

// MARIAMS ROUTES

router.get("/searchForPatients/:id", searchForPatient);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/upcomingAppointments/:id", upcomingAppointments);
router.get("/getMyAppointments/:id", getMyAppointments);

//SARAS ROUTES

router.get("/selectedPatient/:doctorid/:patientid", getSinglePatient);
router.get("/viewMyPatients/:id", getMyPatients);
router.patch(
  "/rescheduleAppointment/:doctorid/:appointmentid",
  rescheduleAppointment
);
router.patch(
  "/cancelAppointment/:doctorid/:appointmentid",
  cancelAppointmentforPatient
);
router.patch("/accept/:doctorid/:appointmentid", acceptRequest);
router.patch("/reject/:doctorid/:appointmentid", rejectRequest);
router.get("/pendingRequests/:id", pendingReq);

//LOJAINS ROUTES

router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/viewPastAppointments/:id", viewPastAppointments);
router.post("/addAvailableAppointments/:id", addAvailableAppointments);
router.get("/patientPrescriptions/:doctorid/:patientid", viewAllPrescription);
router.get(
  "/filterThePrescription/:doctorid/:patientid",
  filterThePrescription
);
router.get("/downloadPrescriptionPDF/:prescriptionid", downloadPrescriptionPDF);
router.get("/selectPrescription/:doctorid/:prescriptionid", selectPrescription);
router.patch(
  "/updatePrescription/:doctorid/:prescriptionid",
  updatePrescription
);
router.post("/changeDoctorPassword", changeDoctorPassword);
router.get("/getDoctorNotifications/:id", getDoctorNotifications);
router.get(
  "/getAppNotifications/:doctorid/:patientid",
  createAppointmentNotifications
);

// merging routes
router.get("/getAllMedicines", getAllMedicines);
router.post("/createPrescription/:doctorid/:patientid", createPrescription);

//hanas stuff
router.get("/getUserById/:id", getUserById);

export default router;
