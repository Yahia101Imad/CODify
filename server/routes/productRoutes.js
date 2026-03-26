const express = require("express");
const router = express.Router();
const { createProduct, getProductsBySeller } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/seller/:sellerId", getProductsBySeller);

module.exports = router;