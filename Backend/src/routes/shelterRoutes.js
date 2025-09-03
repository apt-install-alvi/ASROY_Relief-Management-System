import express from "express";
import { db } from "../server.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads/shelters");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all shelters
router.get("/", (req, res) => {
  const query = `
    SELECT s.Shelter_id, s.Shelter_name, s.Total_capacity, s.Current_capacity, s.Shelter_image, a.Area_name
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

// ADD shelter
router.post("/add", upload.single("image"), (req, res) => {
  const { name, area, total_capacity, current_capacity } = req.body;
  const imagePath = req.file ? `uploads/shelters/${req.file.filename}` : null;

  // Generate Shelter_id (S001, S002...)
  db.query("SELECT Shelter_id FROM Shelter ORDER BY Shelter_id DESC LIMIT 1", (err, last) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    let newId = "S001";
    if (last.length) {
      const num = parseInt(last[0].Shelter_id.slice(1)) + 1;
      newId = "S" + num.toString().padStart(3, "0");
    }

    db.query(
      "INSERT INTO Shelter (Shelter_id, Shelter_name, Total_capacity, Current_capacity, Shelter_image) VALUES (?, ?, ?, ?, ?)",
      [newId, name, total_capacity, current_capacity, imagePath],
      (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        if (!area) return res.json({ success: true, Shelter_id: newId });

        db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) => {
          if (err) return res.status(500).json({ success: false, error: err.message });
          if (!areaResult.length) return res.status(400).json({ success: false, error: "Area not found" });

          const areaId = areaResult[0].Area_id;

          // Generate next Location_id (e.g., 'L193')
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
                res.json({ success: true });
              }
            );
          });
        });
      }
    );
  });
});

// UPDATE shelter
router.put("/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, area, total_capacity, current_capacity } = req.body;

  let query = "UPDATE Shelter SET Shelter_name = ?, Total_capacity = ?, Current_capacity = ?";
  const params = [name, total_capacity, current_capacity];

  if (req.file) {
    query += ", Shelter_image = ?";
    params.push(`uploads/shelters/${req.file.filename}`);
  }
  query += " WHERE Shelter_id = ?";
  params.push(id);

  db.query(query, params, (err) => {
    if (err) {
      console.log("Shelter update error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!area) return res.json({ success: true });

    // Update shelter_in_area (only area_id, do not touch Location_id)
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

export default router;