require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require("./routes/uploadRoutes");


const app = express();

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// image upload
app.use("/api/upload", uploadRoutes);

// connect to DB
connectDB();

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));