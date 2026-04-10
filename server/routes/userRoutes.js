const express = require("express");
const router = express.Router();
const { register, login, getUserById, updateUser, getUserByUsername } = require("../controllers/userController");
const protect = require('../middleware/authMiddleware')

router.post("/register", register);
router.post("/login",protect, login);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.get("/username/:username", getUserByUsername);

module.exports = router;