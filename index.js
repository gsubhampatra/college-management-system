import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes (You can define routes in separate files and import them here)
app.get("/", (req, res) => {
  res.send("API is running...");
});

import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);
import batchRoutes from "./routes/batchRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

// Middleware for routes

app.use("/api/batches", batchRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
