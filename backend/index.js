import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the CareFlux API",
    version: "1.0.0",
    status: "online",
  });
});

// Sample API route
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT}`
  );
});
