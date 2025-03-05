const { UserRepository } = require('../models/userModel');

class UserController {
    // Listar todos los usuarios
    list(req, res) {
      const users = UserRepository.findAll();
      res.render('users/list', { 
        users,
        isLoggedIn: req.session.isLoggedIn || false,
        usuario: req.session.email
      });
    }
  
    // Mostrar formulario de registro
    showRegisterForm(req, res) {
      res.render('users/register', {
        usuario: req.session.email,
        isLoggedIn: req.session.isLoggedIn || false,
    });
    }
  
    // Procesar registro de usuario
    register(req, res) {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
  
      // Crear usuario
      const newUser = UserRepository.create(userData);
  
      // Redirigir a lista de usuarios
      res.redirect('/users');
    }
  
    // Mostrar detalle de usuario
    detail(req, res) {
      const user = UserRepository.findById(req.params.id);
      
      if (user) {
        res.render('users/detail',{
          user,
          usuario: req.session.email,
          isLoggedIn: req.session.isLoggedIn || false,
      });
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    }
  }
  
  module.exports = new UserController();