const db = require('../../db/database');
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
}

