const express = require("express");
const router = express.Router();
const { createProduct, getProductsBySeller, getProductById, updateProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/seller/:sellerId", getProductsBySeller);
router.get("/:id", getProductById);
router.put("/:id",protect, updateProduct);

module.exports = router;