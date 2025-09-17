const express  = require('express');
const router = express.Router();
const Product = require('../model/product');
const Category = require('../model/category');

// Index
router.get('/', async (req, res) => {
    const products = await Product.find().populate('category'); // ✅ fixed typo
    res.render('products/index', { products });
});

// New form
router.get('/new', async (req, res) => {
    const categories = await Category.find();
    res.render('products/new', { categories });
});

// Create Product
router.post('/', async (req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
});

// Edit Form
router.get('/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category'); // ✅ populate here
    const categories = await Category.find();
    res.render('products/edit', { product, categories });
});

// Update Product
router.put('/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
});

// Delete Product
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});

module.exports = router;
