const Product = require('../models/productModel');

// Ambil semua produk
exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Ambil produk berdasarkan ID
exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.getProductById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
};

// Create product
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const productData = { name, price, is_popular: 0 };
  Product.createProduct(productData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product created successfully' });
  });
};

// Update product by ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const productData = { name, price };
  Product.updateProduct(id, productData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated successfully' });
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted successfully' });
  });
};

// Ambil produk populer
exports.getPopularProducts = (req, res) => {
  Product.getPopularProducts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create popular product
exports.createPopularProduct = (req, res) => {
  const { name, price } = req.body;
  const productData = { name, price, is_popular: 1 };
  Product.createPopularProduct(productData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Popular product created successfully' });
  });
};

// Update popular product (name, price, is_popular)
exports.updatePopularProduct = (req, res) => {
  const { id, name, price, is_popular } = req.body;
  if (!id) return res.status(400).json({ error: 'Product ID is required' });
  if (!name) return res.status(400).json({ error: 'Product name is required' });
  if (!price) return res.status(400).json({ error: 'Product price is required' });
  if (typeof is_popular === 'undefined') return res.status(400).json({ error: 'is_popular is required' });

  const productData = { name, price, is_popular };
  Product.updatePopularProduct(id, productData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Popular product updated successfully' });
  });
};

// Upload image produk
exports.uploadImage = (req, res) => {
  const id = req.params.id;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const imagePath = `/uploads/${req.file.filename}`; // path relatif, sesuaikan folder upload kamu

  Product.updateProductImage(id, imagePath, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Image uploaded successfully', image: imagePath });
  });
};
