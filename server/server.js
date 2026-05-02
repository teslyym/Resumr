const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allows cookies to be sent from frontend
  }),
);

// Health check route — useful for testing the server is alive
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Resumr server is running" });
});

// Routes (we'll add these in the next phase)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cv', require('./routes/cvRoutes'));

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✓ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });
