import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

config({
  path: ".env",
});

const port = process.env.PORT || 8080; // You can choose any port you prefer
const mongoURI = process.env.MongodbUri;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", customerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
