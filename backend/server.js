require("dotenv").config({ path: "./.env" });

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

const db = require("./models/db");

const app = express();

app.use(cors());
app.use(express.json());

app.locals.db = db;

const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
