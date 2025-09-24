import express from "express";
import { db } from "../server.js";
const router = express.Router();

/**
 * 1. Get all donations with summary totals
 */
router.get("/list", (req, res) => {
  const query = `
    SELECT 
      d.Donation_id as id,
      d.Donor_name as donor,
      d.Donor_contact as donor_contact,
      d.Donation_type as donation_type,
      d.Amount as amount,
      d.Item_name as item,
      d.Quantity as quantity,
      d.Date_received as date_received,
      e.Event_name as event_name,
      (SELECT COALESCE(SUM(Amount), 0) FROM Donation WHERE Donation_type = 'Money') as total_money,
      (SELECT COALESCE(SUM(Quantity), 0) FROM Donation WHERE Donation_type != 'Money') as total_items,
      (SELECT COUNT(*) FROM Donation) as total_donations
    FROM Donation d
    LEFT JOIN Event e ON d.Event_id = e.Event_id
    ORDER BY d.Date_received DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch donations" });
    }
    
    // Extract summary from first row (all rows have the same summary values)
    const summary = results.length > 0 ? {
      totalMoney: results[0].total_money,
      totalItems: results[0].total_items,
      totalDonations: results[0].total_donations
    } : {
      totalMoney: 0,
      totalItems: 0,
      totalDonations: 0
    };
    
    // Remove summary fields from individual donation objects
    const donations = results.map(({ total_money, total_items, total_donations, ...donation }) => donation);
    
    res.json({
      donations,
      summary
    });
  });
});

/**
 * 2. Get all active events with area name
 */
router.get("/active-events", (req, res) => {
  const query = `
    SELECT e.Event_id, e.Event_name, a.Area_name
    FROM Event e
    JOIN Area a ON e.Event_area_id = a.Area_id
    WHERE e.Status = 'Active'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch events" });
    }
    res.json(results);
  });
});

/**
 * 3. Add a donation
 */
router.post("/add", (req, res) => {
  const {
    event,
    donor,
    donor_contact,
    donation_type,
    amount,
    item,
    quantity,
    date_received
  } = req.body;

  // Extract event name before " - "
  const eventName = event.split(" - ")[0];

  db.query(
    "SELECT Event_id FROM Event WHERE Event_name = ? LIMIT 1",
    [eventName],
    (err, eventResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch event id" });
      }

      let eventId = null;
      if (eventResults.length > 0) {
        eventId = eventResults[0].Event_id;
      }

      const donationId = "D" + String(Math.floor(Math.random() * 9999)).padStart(4, "0");

      const query = `
        INSERT INTO Donation
          (Donation_id, Event_id, Donor_name, Donor_contact, Donation_type, Amount, Item_name, Quantity, Date_received)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [
          donationId,
          eventId,
          donor,
          donor_contact,
          donation_type,
          donation_type === "Money" ? amount : null,
          donation_type !== "Money" ? item : null,
          donation_type !== "Money" ? quantity : null,
          date_received
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add donation" });
          }
          res.json({ message: "Donation added successfully", donationId });
        }
      );
    }
  );
});

export default router;