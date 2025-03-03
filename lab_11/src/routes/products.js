// routes/products.js - Módulo de rutas para productos

const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para listar productos
router.get('/', (req, res) => {
  res.render('products/list');
});

// Ruta para mostrar formulario de nuevo producto
router.get('/new', (req, res) => {
  res.render('products/new');
});

// Ruta para mostrar un producto específico
router.get('/:id', (req, res) => {
  // Aquí normalmente buscaríamos el producto en una base de datos
  // Para este ejemplo, simplemente enviamos la vista de detalles
  res.render('products/detail');
});

module.exports = router;
