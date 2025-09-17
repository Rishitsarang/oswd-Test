const express = require('express');
const router = express.Router();
const Category = require('../model/category');

// All Categories Route
router.get('/', async (req, res) => {
    const categories = await Category.find({});
    res.render('categories/index.ejs', { categories });
});

// New Form Route
router.get('/new', (req, res) => {
    res.render('categories/new.ejs');
});

// Create Category Route
router.post('/', async (req, res) => {
    await Category.create(req.body);
    res.redirect('/categories');
});

// Edit Form Route
router.get('/:id/edit', async (req, res) => {
    const category = await Category.findById(req.params.id); // ✅ fixed
    res.render('categories/edit.ejs', { category });
});

// Update Category Route
router.put('/:id', async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/categories'); // ✅ lowercase
});

// Delete Category Route
router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
});

module.exports = router;
