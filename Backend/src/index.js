import express from "express";
import cors from "cors";
import eventRoutes from "routes/eventRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
