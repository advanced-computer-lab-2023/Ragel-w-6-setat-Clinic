import express from "express";
import {
    viewUpcomingAppointments,getHealthRecords,addAvailableAppointments,viewContract,acceptContract
    } from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/getHealthRecords/:id", getHealthRecords);
//router.get("/filterAppointments/:id", filterAppointments);
router.post("/addAvailableAppointments/:id", addAvailableAppointments);
router.get("/viewContract/:id", viewContract);
router.patch("/acceptContract/:id", acceptContract);


export default router;