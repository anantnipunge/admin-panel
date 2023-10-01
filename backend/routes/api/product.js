const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");

// Create a new Product
router.post("/upload", productController.createProduct);

module.exports = router;
