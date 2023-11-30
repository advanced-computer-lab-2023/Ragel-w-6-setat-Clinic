import express from "express";
import { createPatient,  searchForDoctor, filterAvailableAppointments ,filtermyAppointments, filterDoctors ,selectDoctor,getAllDoctors,viwHealthPackages, linkFamilyMember,payAppointmentWallet , viewPrescription ,payAppointmentCreditCard, selectPrescription ,viewAllPrescription} from "../controllers/patientController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// post request to create a patient
router.post("/registeration", createPatient);

// Search for a doctor by name/specialty
router.get("/searchForDoctors" , searchForDoctor);

// Filter available appointments by date and status
router.get("/filterAvailableAppointments", filterAvailableAppointments);

// Filter my appointments by date and status
router.get("/filtermyAppointments/:id", filtermyAppointments);

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get("/filterDoctors",filterDoctors);

//select a doctor from the search/filter results 
router.get("/selectDoctor",selectDoctor);

router.get("/viewDoctors", getAllDoctors);

router.get("/viewPrescription/:id", viewPrescription);

//----------------------------------------------------------sprint 2--------------------------------------------------------------//
 
//view health packages options and details 
router.get("/viewHealthPackages",viwHealthPackages);

//link another patient's account as a family member using email or phone number stating relation to the patient
router.post("/linkFamilyMember/:id",linkFamilyMember);

//choose to pay for my appointment using my wallet or credit card
router.post("/payAppointmentWallet/:id",payAppointmentWallet);

//enter credit card details and pay for an appointment using Stripe
router.post("/payAppointmentCreditCard/:id",payAppointmentCreditCard);

//----------------------------------------------------------sprint 3--------------------------------------------------------------//

//view the details of my selected prescription
router.get("/selectPrescription/:id",selectPrescription);

//view all new and old prescriptions and their statuses (filled/ not filled)
router.get("/viewAllPrescriptions/:id",viewAllPrescription);

export default router;
