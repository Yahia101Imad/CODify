const express = require("express");
const router = express.Router();
const { createOrder, getOrdersBySeller, updateOrderStatus } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post("/", createOrder);
router.get("/seller/:sellerId", getOrdersBySeller);
router.put("/:id",protect, updateOrderStatus);

module.exports = router;