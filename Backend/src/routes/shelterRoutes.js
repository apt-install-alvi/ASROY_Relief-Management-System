import express from "express";
import { db } from "../server.js";

const router = express.Router();

// GET all shelters
router.get("/", (req, res) => {
  const query = `SELECT s.Shelter_id, s.Shelter_name, s.Total_capacity, s.Current_capacity, a.Area_name
    FROM Shelter s
    LEFT JOIN shelter_in_area sa ON s.Shelter_id = sa.shelter_id
    LEFT JOIN Area a ON sa.area_id = a.Area_id
  `;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json(results);
  });
});

// GET all areas
router.get("/areas", (req, res) => {
  db.query("SELECT * FROM Area", (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json(results);
  });
});

// ADD shelter (no image handling)
router.post("/add", (req, res) => {
  console.log("Shelter Add Request");
  console.log("req.body:", req.body);

  const { name, area, total_capacity, current_capacity } = req.body;

  db.query("SELECT Shelter_id FROM Shelter ORDER BY Shelter_id DESC LIMIT 1", (err, last) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    let newId = "S001";
    if (last.length) {
      const num = parseInt(last[0].Shelter_id.slice(1)) + 1;
      newId = "S" + num.toString().padStart(3, "0");
    }

    db.query(
      "INSERT INTO Shelter (Shelter_id, Shelter_name, Total_capacity, Current_capacity) VALUES (?, ?, ?, ?)",
      [newId, name, total_capacity, current_capacity],
      (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        if (!area) return res.json({ success: true, Shelter_id: newId });

        db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) => {
          if (err) return res.status(500).json({ success: false, error: err.message });
          if (!areaResult.length) return res.status(400).json({ success: false, error: "Area not found" });

          const areaId = areaResult[0].Area_id;

          db.query("SELECT Location_id FROM shelter_in_area ORDER BY Location_id DESC LIMIT 1", (err, locResult) => {
            if (err) return res.status(500).json({ success: false, error: err.message });

            let nextLocId = "L001";
            if (locResult.length) {
              const num = parseInt(locResult[0].Location_id.slice(1)) + 1;
              nextLocId = "L" + num.toString().padStart(3, "0");
            }

            db.query(
              "INSERT INTO shelter_in_area (Location_id, shelter_id, area_id) VALUES (?, ?, ?)",
              [nextLocId, newId, areaId],
              (err) => {
                if (err) {
                  console.log("Shelter_in_area insert error:", err);
                  return res.status(500).json({ success: false, error: err.message });
                }
                res.json({ success: true, Shelter_id: newId });
              }
            );
          });
        });
      }
    );
  });
});

// UPDATE shelter (no image handling)
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, area, total_capacity, current_capacity } = req.body;

  const query = "UPDATE Shelter SET Shelter_name = ?, Total_capacity = ?, Current_capacity = ? WHERE Shelter_id = ?";
  const params = [name, total_capacity, current_capacity, id];

  db.query(query, params, (err) => {
    if (err) {
      console.log("Shelter update error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    if (!area) return res.json({ success: true });

    db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) => {
      if (err) {
        console.log("Area lookup error:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!areaResult.length) return res.status(400).json({ success: false, error: "Area not found" });

      const areaId = areaResult[0].Area_id;
      db.query(
        "UPDATE shelter_in_area SET area_id = ? WHERE shelter_id = ?",
        [areaId, id],
        (err) => {
          if (err) {
            console.log("Shelter_in_area update error:", err);
            return res.status(500).json({ success: false, error: err.message });
          }
          res.json({ success: true });
        }
      );
    });
  });
});

// DELETE shelter
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Shelter WHERE Shelter_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true });
  });
});

//Filter shelters by area
router.get("/filter/area/:area", (req, res) => {
  const { area } = req.params;
  console.log("Filtering shelters by area:", area);

  const query = "CALL GetSheltersByArea(?)";

  db.query(query, [area], (err, results) => {
    if (err) {
      console.error("Filter by area error:", err);
      return res.status(500).json({ 
        success: false, 
        error: err.message 
      });
    }

    console.log(`Found ${results[0].length} shelters in area: ${area}`);
    res.json(results[0]);
  });
});

export default router;