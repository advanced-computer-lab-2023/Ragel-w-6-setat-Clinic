import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Patient from "./models/Patient.js";
import Doctor from "./models/Doctor.js";
import Admin from "./models/Admin.js";
import { fileURLToPath } from "url";
import path from "path";
import { deleteAdmin } from "./controllers/adminController.js";
dotenv.config({ path: "./.env" });

let uri = process.env.MONGODB_URI;
let port = process.env.PORT;

// express app
const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admins", adminRoutes);

// connect to mongodb & listen for requests

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // app.get("/admins/deleteAdmin", (req, res) => {
  //   const adminUserName = req.body.id;
  //   res.render("deleteAdmin");
  // });

  app.get("/admins/deletePatient", (req, res) => {
    const patientUserName = req.body.id;
    res.render("deletePatient");
  });

  app.get("/admins/deleteDoctor", (req, res) => {
    const DoctorUserName = req.body.id;
    res.render("deleteDoctor");
  });

  app.get('/admins/delete', (req, res) => {
    res.render('deleteAdmin'); // Assuming 'deleteAdmin' is the name of your EJS template file
});
  app.get("/admins/viewDoctorApplications", (req, res) => {
    const DoctorUserName = req.query.id;
    res.render("viewDoctorApplications",{username : DoctorUserName});
  });




