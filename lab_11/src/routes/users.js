// routes/users.js - Módulo de rutas para usuarios

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para listar usuarios
router.get('/', (req, res) => {
  res.render('users/list');
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
  
  // Guardar en un archivo de texto
  const dataPath = path.join(__dirname, '../data');
  
  // Crear directorio de datos si no existe
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }
  
  const filePath = path.join(dataPath, 'users.txt');
  
  // Añadir datos al archivo
  fs.appendFile(
    filePath, 
    `${userData.date} - Nombre: ${userData.name}, Email: ${userData.email}\n`, 
    (err) => {
      if (err) {
        return res.status(500).sendFile(path.join(__dirname, '../views/users/error.hbs'));
      }
      
      // Redirigir a la página de éxito
      res.sendFile(path.join(__dirname, '../views/users/success.hbs'));
    }
  );
});

// Ruta para mostrar un usuario específico
router.get('/:id', (req, res) => {
  // Aquí normalmente buscaríamos el usuario en una base de datos
  // Para este ejemplo, simplemente enviamos la vista de detalles
  res.sendFile(path.join(__dirname, '../views/users/detail.hbs'));
});

module.exports = router;