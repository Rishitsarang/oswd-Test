const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/Product');

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add New Product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get One Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit Product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
