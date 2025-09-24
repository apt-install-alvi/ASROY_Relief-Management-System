// routes/volunteerRoutes.js
import express from "express";
import { db } from "../server.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const router = express.Router();

// ensure upload folder exists
const uploadDir = path.join(process.cwd(), "uploads", "volunteers");
fs.mkdirSync(uploadDir, { recursive: true });

// Use memoryStorage so we can process image buffer with sharp before saving
const storage = multer.memoryStorage();

// file size limit and file filter
const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6 MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// helper to write buffer to file after resizing
async function processAndSaveImage(buffer) {
  // target dimensions (width x height)
  const width = 400;
  const height = 300;
  const filename = `${Date.now()}.jpg`; // save as jpg
  const outPath = path.join(uploadDir, filename);

  // sharp: resize & convert to jpeg, use cover to fill the box
  await sharp(buffer)
    .resize(width, height, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toFile(outPath);

  return `/uploads/volunteers/${filename}`;
}

// ---------------------- Get All Volunteers ----------------------
router.get("/all", (req, res) => {
  const query = `
    SELECT 
      Volunteer_id, 
      Volunteer_name, 
      Volunteer_gender AS Gender, 
      Volunteer_age, 
      Volunteer_Image,
      Volunteer_WorkAssigned AS Work_Assigned,
      Status
    FROM Volunteer
    ORDER BY Volunteer_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: err.message,
        message: "Failed to fetch volunteers"
      });
    }

    res.json(results || []);
  });
});

// ---------------------- Add Volunteer ----------------------
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, gender, status, workAssigned } = req.body;

    // Basic validation
    if (!name || !age) {
      return res.status(400).json({
        success: false,
        error: "Name and age are required"
      });
    }

    // Generate Volunteer_id
    const getMaxIdQuery = "SELECT Volunteer_id FROM Volunteer ORDER BY Volunteer_id DESC LIMIT 1";
    db.query(getMaxIdQuery, async (err, idResult) => {
      if (err) {
        console.error("Error getting max ID:", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      let newId = "V001";
      if (idResult && idResult.length > 0) {
        const lastId = idResult[0].Volunteer_id || "V000";
        const num = parseInt(String(lastId).replace(/^V/, ""), 10) + 1;
        newId = "V" + num.toString().padStart(3, "0");
      }

      // File path (if uploaded) - process and resize using sharp
      let imagePath = null;
      if (req.file && req.file.buffer) {
        try {
          imagePath = await processAndSaveImage(req.file.buffer);
        } catch (procErr) {
          console.error("Error processing image:", procErr);
          return res.status(500).json({ success: false, error: "Failed to process uploaded image" });
        }
      }

      const insertQuery = `
        INSERT INTO Volunteer (Volunteer_id, Volunteer_name, Volunteer_gender, Volunteer_age, Volunteer_Image, Volunteer_WorkAssigned, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(insertQuery, [newId, name, gender || "Better not to mention", age, imagePath, workAssigned || "Rescue Mission", status || "Active"], (err2) => {
        if (err2) {
          console.error("Error inserting volunteer:", err2);
          return res.status(500).json({ success: false, error: err2.message });
        }

        // Return the created volunteer object
        const created = {
          Volunteer_id: newId,
          Volunteer_name: name,
          Gender: gender || "Better not to mention",
          Volunteer_age: age,
          Volunteer_Image: imagePath,
          Work_Assigned: workAssigned || "Rescue Mission",
          Status: status || "Active"
        };

        res.json({ success: true, volunteer: created });
      });
    });
  } catch (error) {
    console.error("Unexpected error in add volunteer:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//---------------------- Edit Volunteer ----------------------
router.put("/edit/:id", upload.single("photo"), async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const { name, age, gender, status, workAssigned } = req.body;

    console.log("Edit volunteer request:", { volunteerId, name, age, gender, status, workAssigned });

    if (!name || !age) {
      return res.status(400).json({ success: false, error: "Name and age are required" });
    }

    // If new file uploaded, process & save it
    let newImagePath = null;
    if (req.file && req.file.buffer) {
      try {
        newImagePath = await processAndSaveImage(req.file.buffer);
      } catch (procErr) {
        console.error("Error processing image:", procErr);
        return res.status(500).json({ success: false, error: "Failed to process uploaded image" });
      }
    }

    // Get old image path first so we can delete if replaced
    db.query("SELECT Volunteer_Image FROM Volunteer WHERE Volunteer_id = ?", [volunteerId], (qErr, qRows) => {
      if (qErr) {
        console.error("Error fetching old image path:", qErr);
        return res.status(500).json({ success: false, error: qErr.message });
      }

      if (qRows.length === 0) {
        return res.status(404).json({ success: false, error: "Volunteer not found" });
      }

      const oldImage = qRows[0].Volunteer_Image;

      // Build update query - FIXED: Proper field names
      let updateQuery, params;
      if (newImagePath) {
        updateQuery = `UPDATE Volunteer SET Volunteer_name = ?, Volunteer_gender = ?, Volunteer_age = ?, Volunteer_Image = ?, Volunteer_WorkAssigned = ?, Status = ? WHERE Volunteer_id = ?`;
        params = [name, gender || "Better not to mention", age, newImagePath, workAssigned || "Rescue Mission", status || "Active", volunteerId];
      } else {
        updateQuery = `UPDATE Volunteer SET Volunteer_name = ?, Volunteer_gender = ?, Volunteer_age = ?, Volunteer_WorkAssigned = ?, Status = ? WHERE Volunteer_id = ?`;
        params = [name, gender || "Better not to mention", age, workAssigned || "Rescue Mission", status || "Active", volunteerId];
      }

      console.log("Executing SQL:", updateQuery);
      console.log("With params:", params);

      db.query(updateQuery, params, (err, result) => {
        if (err) {
          console.error("Error updating volunteer:", err);
          // If we saved a new image, attempt to delete it to avoid orphan files
          if (newImagePath && newImagePath.startsWith("/uploads/volunteers/")) {
            fs.unlink(path.join(process.cwd(), newImagePath), () => {});
          }
          return res.status(500).json({ success: false, error: err.message });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, error: "Volunteer not found" });
        }

        // Return updated volunteer
        const q = `SELECT Volunteer_id, Volunteer_name, Volunteer_gender AS Gender, Volunteer_age, Volunteer_Image, Volunteer_WorkAssigned AS Work_Assigned, Status FROM Volunteer WHERE Volunteer_id = ?`;
        db.query(q, [volunteerId], (err2, rows) => {
          if (err2) {
            console.error("Error fetching updated volunteer:", err2);
            return res.status(500).json({ success: false, error: err2.message });
          }

          // If new image was saved and old exists and is different, delete old file
          if (newImagePath && oldImage && oldImage !== newImagePath && oldImage.startsWith("/uploads/volunteers/")) {
            const oldFilePath = path.join(process.cwd(), oldImage);
            fs.unlink(oldFilePath, (unlinkErr) => {
              if (unlinkErr) console.warn("Failed to delete old image file:", unlinkErr.message);
            });
          }

          res.json({ success: true, volunteer: rows[0] });
        });
      });
    });

  } catch (error) {
    console.error("Unexpected error in edit volunteer:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
// ---------------------- Delete Volunteer ----------------------
router.delete("/delete/:id", (req, res) => {
  try {
    const volunteerId = req.params.id;

    // Fetch image to remove file if exists
    db.query("SELECT Volunteer_Image FROM Volunteer WHERE Volunteer_id = ?", [volunteerId], (err, rows) => {
      if (err) {
        console.error("Error fetching volunteer image:", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      const img = rows[0] && rows[0].Volunteer_Image;

      db.query("DELETE FROM Volunteer WHERE Volunteer_id = ?", [volunteerId], (err2) => {
        if (err2) {
          console.error("Error deleting volunteer:", err2);
          return res.status(500).json({ success: false, error: err2.message });
        }

        // Attempt to delete image file from disk
        if (img && img.startsWith("/uploads/volunteers/")) {
          const filePath = path.join(process.cwd(), img);
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.warn("Failed to delete image file:", unlinkErr.message);
            }
          });
        }

        res.json({ success: true, message: "Volunteer deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Unexpected error in delete volunteer:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
