import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import { connectDB } from "./config/database";
import enquiryRoutes from "./routes/enquiry.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

/* =========================
   Health Check
========================= */

app.get("/api/health", async (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   Routes
========================= */

app.use("/api/enquiries", enquiryRoutes);

/* =========================
   Root
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Node Express server is running",
  });
});

/* =========================
   Server
========================= */

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();