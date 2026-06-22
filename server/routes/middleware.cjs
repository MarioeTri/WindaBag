const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ADMIN_PASSWORD || "fallback_secret";

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(header.split(" ")[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token tidak valid" });
  }
}

module.exports = { requireAuth };
