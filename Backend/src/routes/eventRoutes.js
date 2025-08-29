import express from "express";
import { db } from "../server.js";

const router = express.Router();

// ---------------------- Add Event ----------------------
router.post("/add", (req, res) => {
  const { eventName, areaName, date, time } = req.body;

  if (!eventName || !areaName || !date || !time) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  // Get Area ID
  const getAreaIdQuery = "SELECT Area_id FROM Area WHERE Area_name = ?";
  db.query(getAreaIdQuery, [areaName], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (result.length === 0) return res.status(400).json({ success: false, error: "Area not found" });

    const areaId = result[0].Area_id;

    // Generate new Event ID
    const getMaxIdQuery = "SELECT Event_id FROM Event ORDER BY Event_id DESC LIMIT 1";
    db.query(getMaxIdQuery, (err, idResult) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      let newEventId = "E001";
      if (idResult.length > 0) {
        const lastId = idResult[0].Event_id;
        const num = parseInt(lastId.slice(1)) + 1;
        newEventId = "E" + num.toString().padStart(3, "0");
      }

      // Insert Event
      const insertQuery = `
        INSERT INTO Event (Event_id, Event_area_id, Event_name, Date_of_occurrence, Time_of_occurrence, Status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(insertQuery, [newEventId, areaId, eventName, date, time, "Active"], (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.json({ success: true, message: "Event added successfully", Event_id: newEventId });
      });
    });
  });
});

// ---------------------- Get All Events ----------------------
router.get("/all", (req, res) => {
  const query = `
    SELECT e.Event_id, e.Event_name, e.Date_of_occurrence, e.Time_of_occurrence, e.Status,
           a.Area_name AS area
    FROM Event e
    JOIN Area a ON e.Event_area_id = a.Area_id
    ORDER BY e.Date_of_occurrence DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json(results);
  });
});

// ---------------------- Homepage Filtered Events ----------------------
router.get("/homepage", async (req, res) => {
  const fromDate = req.query.fromDate || null;
  const toDate = req.query.toDate || null;

  try {
    const [rows] = await db.promise().query("CALL GetFilteredEvents(?, ?)", [fromDate, toDate]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
