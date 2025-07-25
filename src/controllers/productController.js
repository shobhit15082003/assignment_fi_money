const { Product } = require("../models");

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ product_id: product.id });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.quantity = quantity;
    await product.save();
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
