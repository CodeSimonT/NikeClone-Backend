import express from "express";
const app = express();

import { connectDB } from "./db/index.js";
import mongoose from "mongoose";
import cors from "cors";
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

import router from "./routes/routes.js";

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// routes
app.use("/shoes", router);

const port = process.env.PORT || 5000;

const lunchApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(process.env.DBconnect);
    app.listen(port, console.log(`App is listining on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
lunchApp();
