const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary.cjs");
const { requireAuth } = require("./middleware.cjs");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan"));
    }
  },
});

// POST /api/upload — admin only
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File gambar wajib diupload" });

    const b64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "windabag",
      resource_type: "image",
    });

    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
