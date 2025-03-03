// routes/products.js - Módulo de rutas para productos

const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para listar productos
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/products/list.html'));
});

// Ruta para mostrar formulario de nuevo producto
router.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/products/new.html'));
});

// Ruta para mostrar un producto específico
router.get('/:id', (req, res) => {
  // Aquí normalmente buscaríamos el producto en una base de datos
  // Para este ejemplo, simplemente enviamos la vista de detalles
  res.sendFile(path.join(__dirname, '../views/products/detail.html'));
});

module.exports = router;
