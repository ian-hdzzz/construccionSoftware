const  Usuario = require('../models/authModel');
const bcrypt = require('bcryptjs')

class SignUp {
    get_signup(req,res){
        res.render('signup', {
            isLoggedIn: req.session.isLoggedIn || false,
            email: req.session.email || '',
            isNew: true,
            csrfToken: req.csrfToken(),
        });
    }
    post_signup(req,res, next){
        const nuevo_usuario = new Usuario(req.body.email, req.body.password);
            console.log(req.body.email)
            console.log(req.body.password)
            console.log('Token CSRF recibido:', req.body._csrf);

        nuevo_usuario.save().then(() => {
            res.redirect('login');
        }).catch((error) => {
            console.log(error + 'Erroooor');
        });
    }

    get_login(request, response, next){
        response.render('login', {
            isLoggedIn: request.session.isLoggedIn || false,
            email: request.session.email || '',
            isNew: false,
            csrfToken: request.csrfToken(),
        });
    };

    post_login(request, response, next) {
        Usuario.fetchOne(request.body.email)
          .then(([rows, fieldData]) => {
            if (rows.length > 0) {
              bcrypt.compare(request.body.password, rows[0].password)
                .then((doMatch) => {
                  if (doMatch) {
                    request.session.email = rows[0].email;
                    request.session.isLoggedIn = true;
                    
                    // Get user privileges based on their role
                    Usuario.getPrivilegios(rows[0].email)  // Use email instead of username
                      .then(([privilegios, fieldData]) => {
                        request.session.privilegios = privilegios; // Store privileges in session
                        return request.session.save(err => {
                          response.redirect('/products');
                        });
                      }).catch((error) => {
                        console.log(error);
                      });
                  } else {
                    response.redirect('/404');
                  }
                }).catch((error) => {
                  console.log(error);
                });
            } else {
              response.redirect('login');
            }
          }).catch((error) => {
            console.log(error);
          });
      }

    isAuthenticated(req, res, next) {
        // Verifica si la sesión tiene datos (por ejemplo, nombre o email)
        if (req.session.email) {
            return next(); // Si está logueado, permite continuar
        }
        // Si no está logueado, redirige al login
        res.redirect('/auth/login');
    }
    logOut(req, res) {
        // Elimina la sesión cuando se haga logout
        req.session.destroy(() => {
            res.redirect('/home'); // Redirige al usuario después de cerrar sesión
        });
    }
    post_signup(req, res, next) {
        const nuevo_usuario = new Usuario(req.body.email, req.body.password);
        
        nuevo_usuario.save()
          .then(() => {
            // After saving the user, assign them the cliente role
            return Usuario.assignRoleToUser(req.body.email, 'cliente');
          })
          .then(() => {
            res.redirect('login');
          })
          .catch((error) => {
            console.log(error + 'Erroooor');
          });
      }
}

module.exports = new SignUp();