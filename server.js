const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { connectDB } = require("./config/database");
const enquiryRoutes = require("./routes/enquiry.routes");
const productsRoutes = require("./routes/product.routes");


dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/products", productsRoutes);


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