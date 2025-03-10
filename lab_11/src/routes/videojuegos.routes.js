const express = require('express');
const router = express.Router();
const videojuegosController = require('../controllers/videojuego');

// Obtener todos los videojuegos
router.get('/', videojuegosController.getVideojuegos);

// Formulario para nuevo videojuego
router.get('/nuevo', videojuegosController.getFormNuevo);

// Insertar un nuevo videojuego
router.post('/', videojuegosController.insertarVideojuego);

// Obtener un videojuego específico
router.get('/:videojuego_id', videojuegosController.getVideojuego);

// Formulario para editar videojuego
router.get('/:videojuego_id/editar', videojuegosController.getFormEditar);

// Actualizar un videojuego
router.post('/:videojuego_id', videojuegosController.actualizarVideojuego);

module.exports = router;