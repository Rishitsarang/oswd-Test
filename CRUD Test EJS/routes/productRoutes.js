const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// UI Routes
router.get('/', productController.showProducts);

router.get('/add', productController.addProductPage);
router.post('/add', productController.addProduct);

router.get('/edit/:id', productController.editProductPage);
router.post('/edit/:id', productController.editProduct);

router.get('/delete/:id', productController.deleteProductPage);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
