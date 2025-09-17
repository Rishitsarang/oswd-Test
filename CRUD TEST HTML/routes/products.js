const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes:
// POST   /api/products      => create
// GET    /api/products      => list all
// GET    /api/products/:id  => single
// PUT    /api/products/:id  => update
// DELETE /api/products/:id  => delete

router.route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
