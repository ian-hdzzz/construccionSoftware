const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../controllers/authController');
const canCreate = require('../../util/canCreate');
const canView= require('../../util/canView');

// Ruta para listar productos
router.get('/', isAuthenticated, canView,productController.list);

// Ruta para mostrar formulario de nuevo producto
router.get('/new', isAuthenticated, canCreate, productController.showNewProductForm);

// Ruta para crear nuevo producto
router.post('/new',isAuthenticated, canCreate, productController.create);
// Ruta para mostrar un producto específico
router.get('/:id', isAuthenticated, canView, productController.detail);

module.exports = router;