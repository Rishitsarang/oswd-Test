const Product = require('../models/product_model');

// Show product list
exports.showProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('index', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add product page
exports.addProductPage = (req, res) => {
  res.render('add');
};

// Handle add product
exports.addProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Edit product page
exports.editProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('edit', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Handle edit product
exports.editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete confirmation page
exports.deleteProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('delete', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Handle delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
