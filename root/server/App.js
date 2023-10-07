import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

let uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
