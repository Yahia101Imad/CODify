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
      .sort({ createdAt: -1 });

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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, images, size, color } = req.body;

    // check if id of product
    if (!id) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // find the product
    const product = await Product.findById(id);

    // check if exists
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // check if the product for the user updating (important!)
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // update only the data changed
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) {
      if (price <= 0) {
        return res.status(400).json({
          message: "Price must be greater than 0",
        });
      }
      product.price = price;
    }

    if (images) {
      if (!Array.isArray(images)) {
        return res.status(400).json({
          message: "Images must be an array",
        });
      }
      product.images = images;
    }

    if (size) product.size = size;
    if (color) product.color = color;

    // save the update
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
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

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // deleting the product after checking the product is for the user deleting
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      sellerId: req.user.id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};