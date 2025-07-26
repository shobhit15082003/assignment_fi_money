const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./src/config/db");
const { User, Product } = require("./src/models");

dotenv.config();

const app = express(); // ✅ define app BEFORE using middlewares

// ✅ Use CORS middleware after app is defined
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/", authRoutes);

const productRoutes = require("./src/routes/productRoutes");
app.use("/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Inventory Management Tool API is running");
});

// Swagger docs
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected Successfully");
    await sequelize.sync({ alter: true });
    console.log("Models synchronized.");
  } catch (error) {
    console.log("DB Connection Failed");
    console.log(error);
  }
  console.log(`Server started on port ${PORT}`);
});
