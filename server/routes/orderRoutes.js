const express = require("express");
const router = express.Router();
const { createOrder, getOrdersBySeller, updateOrderStatus, getOrderById } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post("/", createOrder);
router.get("/seller/:sellerId", getOrdersBySeller);
router.put("/:id",protect, updateOrderStatus);
router.get("/:id",protect, getOrderById);

module.exports = router;