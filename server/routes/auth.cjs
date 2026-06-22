const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.ADMIN_PASSWORD || "fallback_secret";

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Password salah" });
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

module.exports = router;
