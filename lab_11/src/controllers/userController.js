const { UserRepository } = require('../models/userModel');

class UserController {
    // Listar todos los usuarios
    list(req, res) {
      const users = UserRepository.findAll();
      res.render('users/list', { users });
    }
  
    // Mostrar formulario de registro
    showRegisterForm(req, res) {
      res.render('users/register');
    }
  
    // Procesar registro de usuario
    register(req, res) {
      try {
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };
  
        // Crear usuario
        const newUser = UserRepository.create(userData);
  
        // Redirigir a lista de usuarios
        res.redirect('/users');
      } catch (error) {
        // Manejo de errores
        res.status(400).render('users/register', { 
          error: error.message 
        });
      }
    }
  
    // Mostrar detalle de usuario
    detail(req, res) {
      const user = UserRepository.findById(req.params.id);
      
      if (user) {
        res.render('users/detail', { user });
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    }
  }
  
  module.exports = new UserController();