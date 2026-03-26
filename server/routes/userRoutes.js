const express = require("express");
const router = express.Router();
const { register, login, getUserById } = require("../controllers/userController");
const protect = require('../middleware/authMiddleware')

router.post("/register", register);
router.post("/login",protect, login);
router.get("/:id", getUserById);

module.exports = router;