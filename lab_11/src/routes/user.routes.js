const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../controllers/logInController');

// Ruta para listar usuarios
router.get('/', isAuthenticated, userController.list);

// Ruta para mostrar formulario de registro
router.get('/register', isAuthenticated, userController.showRegisterForm);

// Ruta para procesar el formulario (POST)
router.post('/register', userController.register);

// Ruta para mostrar un usuario específico
router.get('/:id', isAuthenticated, userController.detail);

module.exports = router;