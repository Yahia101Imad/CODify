const express = require("express");
const router = express.Router();
const { createOrder, getOrdersBySeller } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/seller/:sellerId", getOrdersBySeller);

module.exports = router;