import express from "express";
import {
  createPatient,
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
  getMyAppointments,
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
  rescheduleAppointmentforPatient,
  rescheduleAppointmentforFamilyMember,
  cancelAppointmentForSelf,
  cancelAppointmentForFamilyMember,
} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// HABIBAS ROUTES

router.post("/registeration", createPatient);
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

// MARIAMS ROUTES
router.get("/searchForDoctors/:id", searchForDoctor);
router.get("/filterAvailableAppointments", filterAvailableAppointments);
router.get("/filterMyAppointments/:id", filterMyAppointments);
router.get("/getMyAppointments/:id", getMyAppointments);
router.get("/filterDoctors/:id", filterDoctors);
router.get("/doctorDetails/:patientid/:doctorid", doctorDetails);

// sprint 2

router.post("/linkFamilyMember/:id", linkFamilyMember);

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

//sprint 3

router.patch(
  "/rescheduleAppointmentforPatient/:patientid/:appointmentid",
  rescheduleAppointmentforPatient
);

router.patch("/rescheduleAppointmentforFamilyMember/:patientid/:appointmentid",
 rescheduleAppointmentforFamilyMember);

 router.patch("/cancelAppointmentForSelf/:id",cancelAppointmentForSelf);
 router.patch("/cancelAppointmentForFamilyMember/:id",cancelAppointmentForFamilyMember);
 
export default router;
