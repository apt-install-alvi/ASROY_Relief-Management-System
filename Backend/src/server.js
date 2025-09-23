import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import fs from "fs";

import eventRoutes from "./routes/eventRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import shelterRoutes from "./routes/shelterRoutes.js"; 
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    return next();
  }
  express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satadafannum",
  database: "relief_distribution",
});


db.connect(err => {
  if (err) console.error(err);
  else console.log("Connected to MySQL");
});

const uploadsPath = path.join(process.cwd(), "uploads");
fs.mkdirSync(path.join(uploadsPath, "volunteers"), { recursive: true });
// fs.mkdirSync(path.join(uploadsPath, "shelters"), { recursive: true }); 

app.use("/uploads", express.static(uploadsPath));

app.use("/api/events", eventRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/shelternew", shelterRoutes); 
app.use("/api/inventory", inventoryRoutes); 

const PORT = process.env.PORT || 5000;

app.get("/api/ping", (req, res) => {
  res.json({ success: true, message: "Frontend-backend connection OK" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

