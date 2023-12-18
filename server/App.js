import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import conversationRoutes from "./routes/Conversation.js";
import messageRoutes from "./routes/Message.js";
import {
  login,
  registerDoctor,
  registerPatient,
  resetPasswordOTP,
} from "./controllers/userController.js";
import multer from "multer";
import path from "path";
dotenv.config({ path: "./.env" });

let uri = process.env.MONGODB_URI;
let port = process.env.PORT;

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); //Appending extension
  },
});

const upload = multer({ storage: storage });

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
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.post("/login", login);
app.post(
  "/registerDoctor",
  upload.fields([
    { name: "fileID", maxCount: 1 },
    { name: "fileMedicalLicense", maxCount: 1 },
    { name: "fileMedicalDegree", maxCount: 1 },
  ]),
  registerDoctor
);
app.post("/registerPatient", registerPatient);
app.post("/resetPasswordOTP", resetPasswordOTP);

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
