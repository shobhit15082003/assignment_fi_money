const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/db");

const { User, Product } = require("./src/models");

dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
app.use("/", authRoutes);

const productRoutes = require("./src/routes/productRoutes");
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Inventory Management Tool API is running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected Successfully");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized.");
  } catch (error) {
    console.log("DB Connected Failed");
    console.log(error);
  }
  console.log(`Server started on port ${PORT}`);
});
