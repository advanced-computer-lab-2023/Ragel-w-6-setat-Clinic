import express from "express";
import patientController from "../controllers/patientController";
import { body, validationResult } from "express-validator";

const router = express.Router();
