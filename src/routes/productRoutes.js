const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middlewares/auth");

router.post("/", authenticateToken, productController.addProduct);
router.put("/:id/quantity", authenticateToken, productController.updateQuantity);
router.get("/", authenticateToken, productController.getProducts);

module.exports = router;
