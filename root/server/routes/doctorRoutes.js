import express from "express";
import doctorController from "../controllers/doctorController";
import { body, validationResult } from "express-validator";

const router = express.Router();
