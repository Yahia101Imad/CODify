const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware checks the JWT
const protect = async (req, res, next) => {
  let token;

  // check if authorization header has token 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract token
      token = req.headers.authorization.split(" ")[1];

      // check if token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user data without password
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;