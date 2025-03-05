const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para listar usuarios
router.get('/', userController.list);

// Ruta para mostrar formulario de registro
router.get('/register', userController.showRegisterForm);

// Ruta para procesar el formulario (POST)
router.post('/register', userController.register);

// Ruta para mostrar un usuario específico
router.get('/:id', userController.detail);

module.exports = router;