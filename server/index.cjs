const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const authRoutes = require("./routes/auth.cjs");
const productRoutes = require("./routes/products.cjs");
const uploadRoutes = require("./routes/upload.cjs");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
