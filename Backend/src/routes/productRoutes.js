const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const authVerify = require('../Middleware/jwtMiddleware');

router.get('/', authVerify, productController.listProducts);
router.post('/', authVerify, productController.createProduct);
router.put('/:id', authVerify, productController.updateProduct);
router.delete('/:id', authVerify, productController.deleteProduct);

module.exports = router;
