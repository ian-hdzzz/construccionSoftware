// canCreate.js
module.exports = (request, response, next) => {
    if (!request.session.privilegios) {
      return response.status(403).redirect('/auth/login');
    }
    
    const canCreate = request.session.privilegios.some(
      privilegio => privilegio.nombre === "crear productos"
    );
    
    if (canCreate) {
      return next();
    } else {
      return response.status(403).render('403', {
        isLoggedIn: request.session.isLoggedIn || false,
        email: request.session.email || '',
        message: "No tienes permiso para crear productos"
      });
    }
  };