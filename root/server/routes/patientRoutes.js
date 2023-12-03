import express from "express";
import multer from "multer";
import path from "path";
import {
  registerPatient,
  viewPrescription,
  getAllPatients,
  addFamilyMember,
  filterThePrescription,
  selectPrescription,
  filterDoctors,
  searchForDoctor,
  filterMyAppointments,
  filterAvailableAppointments,
  doctorDetails,
  getFamilyMembers,
  getAllDoctors,
  cancelHealthPackageSubscription,
  viewSelectedDoctorAvailableAppointments,
  registerForAnAppointmentPatient,
  registerForAnAppointmentFamilyMember,
  getMyHealthPackages,
  getAllPackages,
  subscribeToHealthPackage,
  subscribeHealthPackageForFamilyMember,
  getFamilyHealthPackages,
  linkFamilyMember,
  viewUpcomingAppointments,
  viewPastAppointments,
  getWalletAmount,
  viewAppointments,
  uploadDocument,
  getMedicalHistory,
  removeDocument,
  processPayment,
  selectPrescription2,
  viewAllPrescription,
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

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

// HABIBAS ROUTES

router.post("/register", registerPatient);
router.get("/allPatients", getAllPatients);
router.get("/allHealthPackages/:id", getAllPackages);
router.patch(
  "/cancelHealthPackage/:patientid",
  cancelHealthPackageSubscription
);
router.get(
  "/doctorDetails/availableAppointment/:patientid/:doctorid",
  viewSelectedDoctorAvailableAppointments
);
router.patch(
  "/registerForAnAppointmentPatient/:patientid/:appointmentid",
  registerForAnAppointmentPatient
);
router.patch(
  "/registerForAnAppointmentFamilyMember/:patientid/:appointmentid",
  registerForAnAppointmentFamilyMember
);
router.get("/myWalletAmount/:id", getWalletAmount);
router.post("/uploadDocument/:id", upload.single("file"), uploadDocument);
router.get("/myMedicalHistory/:id", getMedicalHistory);
router.patch("/removeDocument/:patientid/:documentid", removeDocument);
// Pay with wallet/credit card
router.post("/processPayment/:id", processPayment);

// LOJAINS ROUTES
router.post("/addFamilyMember/:id", addFamilyMember);
router.get("/viewPrescription/:id", viewPrescription);
router.get("/filterThePrescription/:id", filterThePrescription);
router.get(
  "/selectPrescription/:patientid/:prescriptionid",
  selectPrescription
);

//sprint 2
router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/viewPastAppointments/:id", viewPastAppointments);
router.get("/viewAppointments/:id", viewAppointments);

// MARIAMS ROUTES
router.get("/searchForDoctors/:id", searchForDoctor);
router.get("/filterAvailableAppointments", filterAvailableAppointments);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/filterDoctors/:id", filterDoctors);
router.get("/doctorDetails/:patientid/:doctorid", doctorDetails);

// sprint 2

router.post("/linkFamilyMember/:id", linkFamilyMember);

//sprint 3

router.get("/selectPrescription/:id",selectPrescription2);
router.get("/viewAllPrescriptions/:id",viewAllPrescription);

// SARA ROUTES

router.get("/familyMembers/:id", getFamilyMembers);
router.get("/viewDoctors/:id", getAllDoctors);
// router.get("/selectDoctor/:id", getSingleDoctor);

// sprint 2

router.get("/healthPackages/:id", getMyHealthPackages);
router.get("/familyMembersHealthPackages/:id", getFamilyHealthPackages);
router.patch(
  "/subscribeHealthPackage/:patientId/:packageId",
  subscribeToHealthPackage
);
router.patch(
  "/subscribeHealthPackageForFamilyMember/:patientId/:packageId",
  subscribeHealthPackageForFamilyMember
);

export default router;
