const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, storeName } = req.body;

    // check fields
    if (!username || !email || !password || !storeName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists in DB
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
      storeName,
    });

    // create token
    const token = generateToken(user._id);

    // send data
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        storeName: user.storeName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create token
    const token = generateToken(user._id);

    // send data + token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        storeName: user.storeName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // check if "id" in params
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // check if user exists
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // send data
    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error(error);

    // error in the id format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};