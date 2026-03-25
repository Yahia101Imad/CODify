const User = require("../models/User");

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
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
      storeName,
    });

    // send data (note: send token with it later)
    res.status(201).json({
      message: "User registered successfully",
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