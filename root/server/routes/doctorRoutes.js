  import express from "express";
  import {searchForPatient} from "../controllers/doctorController.js";

  import { body, validationResult } from "express-validator";

  const router = express.Router();

  // Search for a patient by name
  router.get('/patients/search', searchForPatient)

  export default router;