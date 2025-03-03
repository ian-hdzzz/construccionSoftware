// routes/users.js - Módulo de rutas para usuarios

const express = require('express');
const path = require('path');
const router = express.Router();

// Arreglo en memoria para almacenar los usuarios
let users = [];

// Ruta para listar usuarios
router.get('/', (req, res) => {
  // Renderiza la vista 'users/list' y pasa los usuarios como contexto
  res.render('users/list', { users });
});

// Ruta para mostrar formulario de registro
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Ruta para procesar el formulario (POST)
router.post('/register', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: new Date().toISOString()
  };
  
  // Agregar el nuevo usuario al arreglo de usuarios
  users.push(userData);

  // Redirigir a la página de éxito
  res.redirect('/users');
});

// Ruta para mostrar un usuario específico
router.get('/:id', (req, res) => {
  // Buscar el usuario por ID
  const user = users[req.params.id];
  if (user) {
    res.render('users/detail', { user });
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

module.exports = router;