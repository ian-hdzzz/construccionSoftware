const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para listar productos
router.get('/', productController.list);

// Ruta para mostrar formulario de nuevo producto
router.get('/new', productController.showNewProductForm);

// Ruta para crear nuevo producto
router.post('/new', productController.create);

// Ruta para mostrar un producto específico
router.get('/:id', productController.detail);

module.exports = router;