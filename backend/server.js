require("dotenv").config({ path: "./.env" });

// Validate required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
  "PORT",
];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

const express = require("express");
const cors = require("cors");

// Initialize DB connection
const db = require("./models/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make db accessible in routes if needed
app.locals.db = db;

/* =========================
   ROUTES
========================= */
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
