const db = require('../../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor(mi_email, mi_password) {
    this.email = mi_email;
    this.password = mi_password;
  }

  save() {
    return bcrypt.hash(this.password, 12).then((password_cifrado) => {
        console.log('user guardado')
        return db.execute('INSERT INTO users(email, password) VALUES (?,?)', [this.email, password_cifrado]);

    }).catch((error) => {
        console.log(error);
    });
  }

  static fetchAll() {
    return db.execute('SELECT * FROM users');
  }

  static fetchOne(email) {
    return db.execute('SELECT * FROM users WHERE email=?', [email]);
  }
  static fetch(email) {
    if (email) {
        return this.fetchOne(email);
    } else {
        return this.fetchAll();
    }
  }
  static getPrivilegios(email) {  // Changed from username to email
    return db.execute(
      `SELECT p.nombre 
       FROM privilegios p, rol_privilegio rp, roles r, 
           usuario_rol ur, users u
       WHERE p.id=rp.privilegio_id AND rp.rol_id=r.id 
           AND r.id=ur.rol_id AND ur.usuario_id=u.id 
           AND u.email=?`, 
      [email]);  // Make sure parameter name matches
  }
  static assignRoleToUser(email, roleName) {
    return db.execute(
      `INSERT INTO usuario_rol (usuario_id, rol_id)
       SELECT u.id, r.id 
       FROM users u, roles r 
       WHERE u.email = ? AND r.nombre = ?`,
      [email, roleName]
    );
  }
}


