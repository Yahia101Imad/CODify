const express = require("express");
const cors = require("cors");
// const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);

// connect to DB
// connectDB();

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));