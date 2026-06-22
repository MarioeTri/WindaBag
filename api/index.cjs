const express = require("express");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  try {
    require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
  } catch (e) {
    // Diabaikan jika dotenv tidak terinstall
  }
}

const authRoutes = require("../server/routes/auth.cjs");
const productRoutes = require("../server/routes/products.cjs");
const uploadRoutes = require("../server/routes/upload.cjs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

module.exports = app;
