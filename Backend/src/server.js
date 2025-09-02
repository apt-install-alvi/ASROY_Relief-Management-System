// server.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js"; // keep as-is
import volunteerRoutes from "./routes/volunteerRoutes.js";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "124519@#maisk#",
  database: "asroy",
  
});

db.connect((err) => {
  if (err) console.error(err);
  else console.log("Connected to MySQL");
});

// Ensure uploads directory exists
const uploadsPath = path.join(process.cwd(), "uploads");
fs.mkdirSync(path.join(uploadsPath, "volunteers"), { recursive: true });

// serve uploaded files statically
app.use("/uploads", express.static(uploadsPath));

// routes
app.use("/api/events", eventRoutes);
app.use("/api/volunteers", volunteerRoutes);

const PORT = process.env.PORT || 5000;
app.get("/api/ping", (req, res) => {
  res.json({ success: true, message: "Frontend-backend connection OK" });
});

// 404: always return JSON so frontend doesn't try to parse HTML or empty body as JSON
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

// Global error handler (ensures JSON response on uncaught errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
