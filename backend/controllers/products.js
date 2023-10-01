const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { title, description, imageUrl, photos, category, rating } = req.body;

    const product = new Product({
      title,
      description,
      imageUrl,
      photos,
      category,
      rating,
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
    // console.log(JSON.stringify(product));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createProduct };
