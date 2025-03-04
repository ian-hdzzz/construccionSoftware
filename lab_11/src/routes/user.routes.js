// routes/users.js - Módulo de rutas para usuarios
const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// Arreglo en memoria para almacenar los usuarios
let users = [];

// Ruta para listar usuarios
router.get('/', userController.showRegisterForm);

// Ruta para mostrar formulario de registro
router.get('/register', userController.showRegisterForm);

// Ruta para procesar el formulario de registro
router.post('/register', userController.register);

// Ruta para mostrar usuario específico
router.get('/:id', userController.detail);

module.exports = router;