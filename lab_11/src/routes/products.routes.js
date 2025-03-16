const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../controllers/authController');

// Ruta para listar productos
router.get('/', isAuthenticated, productController.list);

// Ruta para mostrar formulario de nuevo producto
router.get('/new', isAuthenticated, productController.showNewProductForm);

// Ruta para crear nuevo producto
router.post('/new',isAuthenticated, productController.create);

// Ruta para mostrar un producto específico
router.get('/:id', isAuthenticated, productController.detail);

module.exports = router;