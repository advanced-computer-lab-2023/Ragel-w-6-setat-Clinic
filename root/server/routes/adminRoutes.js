import express from "express";
import adminController from "../controllers/adminController";
import { body, validationResult } from "express-validator";

const router = express.Router();
