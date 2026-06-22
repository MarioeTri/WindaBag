const express = require("express");
const { db } = require("../firebase.cjs");
const { requireAuth } = require("./middleware.cjs");
const router = express.Router();

const COLLECTION = "products";

// GET /api/products — public
router.get("/", async (_req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy("name").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — public
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection(COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Produk tidak ditemukan" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products — admin only
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, price, description, material, colors, features, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ error: "name, price, dan image wajib diisi" });
    }

    const doc = await db.collection(COLLECTION).add({
      name,
      price: Number(price),
      description: description || "",
      material: material || "",
      colors: colors || [],
      features: features || [],
      image,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ id: doc.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id — admin only
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { name, price, description, material, colors, features, image } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (price !== undefined) data.price = Number(price);
    if (description !== undefined) data.description = description;
    if (material !== undefined) data.material = material;
    if (colors !== undefined) data.colors = colors;
    if (features !== undefined) data.features = features;
    if (image !== undefined) data.image = image;
    data.updatedAt = new Date().toISOString();

    await db.collection(COLLECTION).doc(req.params.id).update(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id — admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await db.collection(COLLECTION).doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
