import express from "express";
import { db } from "../server.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer config
const storage = multer.memoryStorage();

const upload = multer(
{
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

async function processAndSaveShelterImage(buffer)
{
  const uploadDir = path.join(process.cwd(), "uploads", "shelters");
  fs.mkdirSync(uploadDir, { recursive: true });
  
  const filename = `shelter-${Date.now()}.jpg`;
  const outPath = path.join(uploadDir, filename);

  await sharp(buffer)
    .resize(600, 400, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toFile(outPath);

  return `/uploads/shelters/${filename}`;
}

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(process.cwd(), "uploads/shelters");
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//     console.log("Created upload directory:", uploadPath);
//   },

//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// GET all shelters
router.get("/", (req, res) => {
    const query =`SELECT s.Shelter_id, s.Shelter_name, s.Total_capacity, s.Current_capacity, s.Shelter_image, a.Area_name
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
// router.post("/add", upload.single("image"), (req, res) => {
//   console.log("Shelter Add Request");
//   console.log("req.body:", req.body);
//   console.log("req.file:", req.file);

//   if (!req.body)
//   {
//     return res.status(400).json({ success: false, error: "No form data received" });
//   }
  
//   const { name, area, total_capacity, current_capacity } = req.body;
//   const imagePath = req.file ? `/uploads/shelters/${req.file.filename}` : null;

//   console.log("Image path to be stored:", imagePath);
  
//   if (!name || !area || !total_capacity || !current_capacity)
//   {
//     return res.status(400).json(
//       { success: false, error: "All fields are required" });
//   }

//   db.query("SELECT Shelter_id FROM Shelter ORDER BY Shelter_id DESC LIMIT 1", (err, last) => {
//     if (err)
//       return res.status(500).json(
//         { success: false, error: err.message });

//     let newId = "S001";
//     if (last.length)
//     {
//       const num = parseInt(last[0].Shelter_id.slice(1)) + 1;
//       newId = "S" + num.toString().padStart(3, "0");
//     }

//     db.query(
//       "INSERT INTO Shelter (Shelter_id, Shelter_name, Total_capacity, Current_capacity, Shelter_image) VALUES (?, ?, ?, ?, ?)",
//       [newId, name, total_capacity, current_capacity, imagePath],
//       (err) =>
//       {
//         if (err)
//           return res.status(500).json(
//             { success: false, error: err.message });

//         if (!area)
//           return res.json(
//             { success: true, Shelter_id: newId });

//         db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) =>
//         {
//           if (err)
//             return res.status(500).json(
//               { success: false, error: err.message });
          
//           if (!areaResult.length)
//             return res.status(400).json(
//               { success: false, error: "Area not found" });

//           const areaId = areaResult[0].Area_id;

//           // Generate next Location_id (e.g., 'L193')
//           db.query("SELECT Location_id FROM shelter_in_area ORDER BY Location_id DESC LIMIT 1", (err, locResult) => {
//             if (err)
//               return res.status(500).json(
//                 { success: false, error: err.message });

//             let nextLocId = "L001";
//             if (locResult.length)
//             {
//               const num = parseInt(locResult[0].Location_id.slice(1)) + 1;
//               nextLocId = "L" + num.toString().padStart(3, "0");
//             }

//             db.query(
//               "INSERT INTO shelter_in_area (Location_id, shelter_id, area_id) VALUES (?, ?, ?)",
//               [nextLocId, newId, areaId],
//               (err) => {
//                 if (err)
//                 {
//                   console.log("Shelter_in_area insert error:", err);
//                   return res.status(500).json({ success: false, error: err.message });
//                 }
//                 res.json({ success: true });
//               }
//             );
//           });
//         });
//       }
//     );
//   });
// });

router.post("/add", upload.single("image"), async (req, res) => {
  console.log("SHELTER ADD REQUEST");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try
  {
    const { name, area, total_capacity, current_capacity } = req.body;

    if (!name || !area || !total_capacity || !current_capacity)
    {
      return res.status(400).json(
      { 
        success: false, 
        error: "All fields are required" 
      });
    }

    // Generate Shelter_id
    db.query("SELECT Shelter_id FROM Shelter ORDER BY Shelter_id DESC LIMIT 1", async (err, last) =>
    {
      if (err)
      {
        console.error("Error getting last Shelter_id:", err);
        return res.status(500).json(
          { success: false, error: err.message });
      }

      let newId = "S001";
      if (last.length)
      {
        const num = parseInt(last[0].Shelter_id.slice(1)) + 1;
        newId = "S" + num.toString().padStart(3, "0");
      }

      // Process image if uploaded
      let imagePath = null;
      if (req.file && req.file.buffer)
      {
        try
        {
          imagePath = await processAndSaveShelterImage(req.file.buffer);
          console.log("Image saved at:", imagePath);
        }
        
        catch (procErr)
        {
          console.error("Error processing image:", procErr);
          return res.status(500).json(
            { success: false, error: "Failed to process uploaded image" });
        }
      }

      const insertQuery = `
        INSERT INTO Shelter (Shelter_id, Shelter_name, Total_capacity, Current_capacity, Shelter_image)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      db.query(insertQuery, [newId, name, total_capacity, current_capacity, imagePath], (err) =>
      {
        if (err)
        {
          console.error("Error inserting shelter:", err);
          return res.status(500).json(
            { success: false, error: err.message });
        }

        console.log("Shelter inserted successfully with ID:", newId);

        // Handle area
        if (!area) {
          return res.json(
            { success: true, shelter_id: newId });
        }

        db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) =>
        {
          if (err)
          {
            console.error("Area lookup error:", err);
            return res.status(500).json(
              { success: false, error: err.message });
          }
          if (!areaResult.length)
          {
            return res.status(400).json(
              { success: false, error: "Area not found" });
          }

          const areaId = areaResult[0].Area_id;

          // Generate Location_id
          db.query("SELECT Location_id FROM shelter_in_area ORDER BY Location_id DESC LIMIT 1", (err, locResult) =>
          {
            if (err)
            {
              console.error("Location ID lookup error:", err);
              return res.status(500).json(
                { success: false, error: err.message });
            }

            let nextLocId = "L001";
            if (locResult.length)
            {
              const num = parseInt(locResult[0].Location_id.slice(1)) + 1;
              nextLocId = "L" + num.toString().padStart(3, "0");
            }

            db.query(
              "INSERT INTO shelter_in_area (Location_id, shelter_id, area_id) VALUES (?, ?, ?)",
              [nextLocId, newId, areaId],
              (err) => {
                if (err)
                {
                  console.error("Shelter_in_area insert error:", err);
                  return res.status(500).json(
                    { success: false, error: err.message });
                }
                
                res.json(
                { 
                  success: true, 
                  shelter:
                  {
                    Shelter_id: newId,
                    Shelter_name: name,
                    Total_capacity: total_capacity,
                    Current_capacity: current_capacity,
                    Shelter_image: imagePath,
                    Area_name: area
                  }
                });
              }
            );
          });
        });
      });
    });
  }
  
  catch (error)
  {
    console.error("Unexpected error in add shelter:", error);
    res.status(500).json(
      { success: false, error: "Internal server error" });
  }
});

// UPDATE shelter
// router.put("/update/:id", upload.single("image"), (req, res) => {
//   const { id } = req.params;

//   if (!req.body)
//   {
//     return res.status(400).json({ success: false, error: "No form data received" });
//   }

//   const { name, area, total_capacity, current_capacity } = req.body;

//   let query = "UPDATE Shelter SET Shelter_name = ?, Total_capacity = ?, Current_capacity = ?";
//   const params = [name, total_capacity, current_capacity];

//   if (req.file) {
//     query += ", Shelter_image = ?";
//     params.push(`/uploads/shelters/${req.file.filename}`);
//   }
//   query += " WHERE Shelter_id  = ?";
//   params.push(id);

//   db.query(query, params, (err) => {
//     if (err) {
//       console.log("Shelter update error:", err);
//       return res.status(500).json({ success: false, error: err.message });
//     }
//     if (!area) return res.json({ success: true });

//     // Update shelter_in_area (only area_id, do not touch Location_id)
//     db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) => {
//       if (err) {
//         console.log("Area lookup error:", err);
//         return res.status(500).json({ success: false, error: err.message });
//       }
//       if (!areaResult.length) return res.status(400).json({ success: false, error: "Area not found" });

//       const areaId = areaResult[0].Area_id;
//       db.query(
//         "UPDATE shelter_in_area SET area_id = ? WHERE shelter_id = ?",
//         [areaId, id],
//         (err) => {
//           if (err) {
//             console.log("Shelter_in_area update error:", err);
//             return res.status(500).json({ success: false, error: err.message });
//           }
//           res.json({ success: true });
//         }
//       );
//     });
//   });
// });

router.put("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  console.log("SHELTER UPDATE REQUEST");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try
  {
    const { name, area, total_capacity, current_capacity } = req.body;

    if (!name || !area || !total_capacity || !current_capacity)
    {
      return res.status(400).json(
      { 
        success: false, 
        error: "All fields are required" 
      });
    }

    // Process new image if uploaded
    let newImagePath = null;
    if (req.file && req.file.buffer)
    {
      try {
        newImagePath = await processAndSaveShelterImage(req.file.buffer);
        console.log("New image saved at:", newImagePath);
      }
      
      catch (procErr)
      {
        console.error("Error processing image:", procErr);
        return res.status(500).json({ success: false, error: "Failed to process uploaded image" });
      }
    }

    // Build update query
    let updateQuery, params;
    if (newImagePath)
    {
      updateQuery = `
        UPDATE Shelter 
        SET Shelter_name = ?, Total_capacity = ?, Current_capacity = ?, Shelter_image = ? 
        WHERE Shelter_id = ?
      `;
      params = [name, total_capacity, current_capacity, newImagePath, id];
    }
    
    else
    {
      updateQuery = `
        UPDATE Shelter 
        SET Shelter_name = ?, Total_capacity = ?, Current_capacity = ? 
        WHERE Shelter_id = ?
      `;
      params = [name, total_capacity, current_capacity, id];
    }

    // Get old image path first for cleanup
    db.query("SELECT Shelter_image FROM Shelter WHERE Shelter_id = ?", [id], (qErr, qRows) => {
      if (qErr)
      {
        console.error("Error fetching old image path:", qErr);
        return res.status(500).json(
          { success: false, error: qErr.message });
      }

      const oldImage = qRows && qRows[0] && qRows[0].Shelter_image;

      // Execute the update
      db.query(updateQuery, params, (err, result) =>
      {
        if (err)
        {
          console.error("Error updating shelter:", err);
          // Clean up newly saved image if update failed
          if (newImagePath)
          {
            fs.unlink(path.join(process.cwd(), newImagePath), () => {});
          }
          return res.status(500).json(
            { success: false, error: err.message });
        }

        // Update area association
        db.query("SELECT Area_id FROM Area WHERE Area_name = ?", [area], (err, areaResult) =>
        {
          if (err)
          {
            console.error("Area lookup error:", err);
            return res.status(500).json(
              { success: false, error: err.message });
          }

          if (!areaResult.length)
          {
            return res.status(400).json(
              { success: false, error: "Area not found" });
          }

          const areaId = areaResult[0].Area_id;

          db.query(
            "UPDATE shelter_in_area SET area_id = ? WHERE shelter_id = ?",
            [areaId, id],
            (err) => {
              if (err)
              {
                console.error("Shelter_in_area update error:", err);
                return res.status(500).json(
                  { success: false, error: err.message });
              }

              // Clean up old image if it was replaced
              if (newImagePath && oldImage && oldImage !== newImagePath && oldImage.startsWith("/uploads/shelters/"))
              {
                const oldFilePath = path.join(process.cwd(), oldImage);
                fs.unlink(oldFilePath, (unlinkErr) =>
                {
                  if (unlinkErr) console.warn("Failed to delete old image:", unlinkErr.message);
                });
              }

              // Return updated shelter data
              const query = `
                SELECT s.Shelter_id, s.Shelter_name, s.Total_capacity, s.Current_capacity, 
                       s.Shelter_image, a.Area_name
                FROM Shelter s
                LEFT JOIN shelter_in_area sa ON s.Shelter_id = sa.shelter_id
                LEFT JOIN Area a ON sa.area_id = a.Area_id
                WHERE s.Shelter_id = ?
              `;
              
              db.query(query, [id], (err2, rows) =>
              {
                if (err2)
                {
                  console.error("Error fetching updated shelter:", err2);
                  return res.status(500).json(
                    { success: false, error: err2.message });
                }

                res.json({ success: true, shelter: rows[0] });
              });
            }
          );
        });
      });
    });
  }
  
  catch (error)
  {
    console.error("Unexpected error in update shelter:", error);
    res.status(500).json(
      { success: false, error: "Internal server error" });
  }
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