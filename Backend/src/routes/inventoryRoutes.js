import express from "express";
import { db } from "../server.js";

const router = express.Router();

// Get all inventory items
router.get("/", (req, res) => {
  const query = `
    SELECT g.Goods_id, g.Goods_name, g.Goods_type, g.Goods_quantity, g.Goods_status
    FROM Goods g
    ORDER BY g.Goods_type, g.Goods_name
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching inventory:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get inventory by type
router.get("/type/:type", (req, res) => {
  const type = req.params.type;
  const query = `
    SELECT g.Goods_id, g.Goods_name, g.Goods_type, g.Goods_quantity, g.Goods_status
    FROM Goods g
    WHERE g.Goods_type = ?
    ORDER BY g.Goods_name
  `;
  db.query(query, [type], (err, results) => {
    if (err) {
      console.error("Error fetching inventory by type:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get low stock items
router.get("/low-stock", (req, res) => {
  const query = `
    SELECT ls.Low_stock_id, g.Goods_id, g.Goods_name, ls.Current_quantity
    FROM Low_Stock ls
    JOIN Goods g ON ls.Goods_id = g.Goods_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching low stock items:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get inventory counts by type
router.get("/counts", (req, res) => {
  const query = `
    SELECT 
      Goods_type,
      COUNT(*) as count,
      SUM(Goods_quantity) as total_quantity
    FROM Goods
    GROUP BY Goods_type
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching inventory counts:", err);
      return res.status(500).json({ error: err.message });
    }

    const counts = {
      Food: 0,
      Medicine: 0,
      Clothes: 0,
      Others: 0
    };

    results.forEach(row => {
      counts[row.Goods_type] = row.total_quantity || row.count;
    });

    res.json(counts);
  });
});

// Add new inventory item
router.post("/", (req, res) => {
  const { name, type, quantity } = req.body;
  const status = quantity < 20 ? "Low Stock" : "In Stock";
 // Get max Goods_id
  db.query('SELECT MAX(CAST(SUBSTRING(Goods_id, 2) AS UNSIGNED)) as maxId FROM Goods', (err, maxIdResult) => {
    if (err) {
      console.error("Error fetching max Goods_id:", err);
      return res.status(500).json({ error: err.message });
    }

    const newId = `G${String(parseInt(maxIdResult[0].maxId || 0) + 1).padStart(3, "0")}`;

    // Insert into Goods table
    const insertGoodsQuery = `
      INSERT INTO Goods (Goods_id, Goods_name, Goods_type, Goods_quantity, Goods_status)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(insertGoodsQuery, [newId, name, type, quantity, status], (err2) => {
      if (err2) {
        console.error("Error inserting new Goods:", err2);
        return res.status(500).json({ error: err2.message });
      }

      // Insert into specific type table
      const typeColumns = {
        Food: "Food_id",
        Medicine: "Medicine_id",
        Clothes: "Clothes_id",
        Others: "Others_id"
      };

      const insertTypeQuery = `INSERT INTO ${type} (${typeColumns[type]}, Stock) VALUES (?, ?)`;
      db.query(insertTypeQuery, [newId, quantity], (err3) => {
        if (err3) {
          console.error(`Error inserting into ${type} table:`, err3);
          return res.status(500).json({ error: err3.message });
        }

        res.json({ success: true, id: newId });
      });
    });
  });
});


// Update stock of an inventory item
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity == undefined || quantity < 0)
  {
    return res.status(400).json({ success: false, error: "Invalid quantity" });
  }

  const status = quantity === 0 ? "Removed" : (quantity < 20 ? "Low Stock" : "In Stock");

  // If quantity is 0, delete the row entirely
  if (quantity === 0)
  {
    const query = `DELETE FROM Goods WHERE Goods_id = ?`;
    db.query(query, [id], (err) =>
    {
      if (err)
      {
        console.error("Error deleting item:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      return res.json({ success: true, message: "Item deleted successfully" });
    });
    return;
  }

  const query = `UPDATE Goods 
                 SET Goods_quantity = ?, Goods_status = ?
                 WHERE Goods_id = ?`;

  db.query(query, [quantity, status, id], (err) => {
    if (err) {
      console.error("Error updating stock:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Stock updated successfully" });
  });
});


export default router;