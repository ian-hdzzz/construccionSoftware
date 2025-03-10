const Videojuego = require('../models/videojuego');

exports.getVideojuegos = (request, response, next) => {
    Videojuego.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('lista-videojuegos', {
                videojuegos: rows
            });
        })
        .catch(err => console.log(err));
};

exports.getVideojuego = (request, response, next) => {
    const id = request.params.videojuego_id;
    Videojuego.findById(id)
        .then(([rows, fieldData]) => {
            response.render('detalle-videojuego', {
                videojuego: rows[0]
            });
        })
        .catch(err => console.log(err));
};

exports.getFormNuevo = (request, response, next) => {
    response.render('form-videojuego', {
        editar: false
    });
};

exports.insertarVideojuego = (request, response, next) => {
    const videojuego = new Videojuego(request.body.nombre, request.body.plataforma);
    videojuego.save()
        .then(() => {
            response.redirect('/videojuegos');
        })
        .catch(err => console.log(err));
};

exports.getFormEditar = (request, response, next) => {
    const id = request.params.videojuego_id;
    Videojuego.findById(id)
        .then(([rows, fieldData]) => {
            response.render('form-videojuego', {
                videojuego: rows[0],
                editar: true
            });
        })
        .catch(err => console.log(err));
};

exports.actualizarVideojuego = (request, response, next) => {
    const id = request.params.videojuego_id;
    const nombre = request.body.nombre;
    const plataforma = request.body.plataforma;
    
    Videojuego.updateById(id, nombre, plataforma)
        .then(() => {
            response.redirect('/videojuegos');
        })
        .catch(err => console.log(err));
};