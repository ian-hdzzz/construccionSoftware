class LogIn{
    action(req, res) {
        console.log('Sesión actual:', req.session.email);
        res.setHeader('Set-Cookie', `userEmail=${req.body.email}; HttpOnly; Max-Age=${24 * 60 * 60}; Path=/`);
        res.render('login', {
            usuario: req.session.email,
            isLoggedIn: req.session.isLoggedIn || false,
        });
    }

    login(req, res) {
        if (!req.body.email) {
            return res.status(400).send('Falta el email');
        }
        res.cookie('email', req.body.email, {
            // Opciones de la cookie
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            httpOnly: true, // La cookie solo es accesible por el servidor
            // secure: true, // Descomentar si usas HTTPS
        });

        req.session.email = req.body.email;
        req.session.isLoggedIn = true;  // Asegúrate de establecer esto explícitamente

        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
            }
            console.log('Cookie establecida');
            res.redirect('/users');
        });
    }

    logOut(req, res) {
        // Elimina la sesión cuando se haga logout
        req.session.destroy(() => {
            res.redirect('/'); // Redirige al usuario después de cerrar sesión
        });
    }

    isAuthenticated(req, res, next) {
        // Verifica si la sesión tiene datos (por ejemplo, nombre o email)
        if (req.session.email) {
            return next(); // Si está logueado, permite continuar
        }
        // Si no está logueado, redirige al login
        res.redirect('/login');
    }
}

module.exports = new LogIn();