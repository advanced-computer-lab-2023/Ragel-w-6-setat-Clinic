import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Patient from "./models/Patient.js";
import Doctor from "./models/Doctor.js";
import Admin from "./models/Admin.js";
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

//general requests

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async function (req, res) {
  try {
    const patient = await Patient.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    const doctor = await Doctor.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    const admin = await Admin.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (patient) {
      res.redirect(`patients/patientHome/${patient._id}`);
    } else if (doctor && doctor.isRegistered) {
      res.redirect(`doctors/doctorHome/${doctor._id}`);
    } else if (admin) {
      res.redirect(`admins/adminHome/${admin._id}`);
    } else {
      // Authentication failed
      console.log("Invalid username or password");
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});