const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const protect = require('../middleware/authMiddleware')

router.post("/register", register);
router.post("/login",protect, login);

module.exports = router;