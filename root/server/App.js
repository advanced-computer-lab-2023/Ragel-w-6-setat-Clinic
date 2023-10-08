import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import patientRoutes from "./routes/patientRoutes.js";
dotenv.config({ path: "./.env" });

let uri = process.env.MONGODB_URI;
let port = process.env.PORT;

// express app
const app = express();

// middleware
app.use(express.json());

app.use("/patients", patientRoutes);

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
