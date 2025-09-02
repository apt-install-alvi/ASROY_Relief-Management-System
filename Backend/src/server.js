import express from "express";
import mysql from "mysql2";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js"; // import event routes

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jelaushekodu!1",
  database: "asroy",
});


db.connect(err => {
  if (err) console.error(err);
  else console.log("Connected to MySQL");
});


app.use("/api/events", eventRoutes);


const PORT = 5000;
app.get("/api/ping", (req, res) => {
  res.json({ success: true, message: "Frontend-backend connection OK" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));