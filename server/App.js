import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import {
  login,
  registerDoctor,
  registerPatient,
} from "./controllers/userController.js";
import multer from "multer";
import path from "path";
dotenv.config({ path: "./.env" });

let uri = process.env.MONGODB_URI;
let port = process.env.PORT;

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(morgan("dev"));

// routes
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admins", adminRoutes);
app.post("/login", login);
app.post("/registerDoctor", registerDoctor);
app.post("/registerPatient", registerPatient);

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
