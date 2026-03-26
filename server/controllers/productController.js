const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, images, size, color } = req.body;

    // sellerId : to get id from token
    const sellerId = req.user.id;

    // check if essential data
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Name, description and price are required",
      });
    }

    // create the product
    const product = new Product({
      sellerId,
      name,
      description,
      price,
      images,
      size,
      color,
    });

    // save in DB
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getProductsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    // check if sellerId in params
    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    // get products
    const products = await Product.find({ sellerId })
      .sort({ createdAt: -1 }); // الأحدث أولاً

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
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

exports.getProductById = async (req, res) => {
  try {
    // NOTE: we mean by the "id" here is the _id of the product (that generated automatically by mongoDB)
    const { id } = req.params;

    // check if id in params
    if (!id) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // find product
    const product = await Product.findById(id)
      .populate("sellerId", "storeName profileImage");

    // check if product exists
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
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