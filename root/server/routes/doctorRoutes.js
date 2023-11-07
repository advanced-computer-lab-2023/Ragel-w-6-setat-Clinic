import express from "express";
import {
    viewUpcomingAppointments,getHealthRecords,filterAppointments,addAvailableAppointments
    } from "../controllers/doctorController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/viewUpcomingAppointments/:id", viewUpcomingAppointments);
router.get("/getHealthRecords/:id", getHealthRecords);
router.get("/filterAppointments/:id", filterAppointments);
router.post("/addAvailableAppointments/:id", addAvailableAppointments);


export default router;