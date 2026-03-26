const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const {
      productId,
      customerName,
      customerPhone,
      quantity,
      size,
      color,
    } = req.body;

    // check if data needed
    if (!productId || !customerName || !customerPhone || !quantity) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // check quantity
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // create order
    const order = new Order({
      productId,
      sellerId: product.sellerId, // NOTE: link the order with seller
      customerName,
      customerPhone,
      quantity,
      size,
      color,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      data: savedOrder,
    });

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getOrdersBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    // check if sellerId in params
    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    // get orders
    const orders = await Order.find({ sellerId })
      .populate("productId", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid seller ID",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};