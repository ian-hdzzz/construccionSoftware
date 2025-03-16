module.exports = (request, response, next) => {
    // Check if privilegios exists in session
    if (!request.session.privilegios) {
        return response.status(403).redirect('/auth/login');
    }
    
    let canView = false;
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == "ver productos") {
            canView = true;
            break;  // Exit the loop once we find the privilege
        }
    }
    
    if (canView) {
        next();  // Only call next() once after checking all privileges
    } else {
        return response.status(403).send("No tienes permiso para ver productos");
    }
};