class User {
  constructor(name, email, password) {
    this.id = User.generateId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = new Date().toISOString();
  }

  // Método estático para generar ID único
  static generateId() {
    return Math.floor(Math.random() * 1000).toString();
  }
}

class UserRepository {
  constructor() {
    this.users = [];
  }

  create(userData) {
    const user = new User(
      userData.name, 
      userData.email, 
      userData.password
    );
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }
}

module.exports = {
  User,
  UserRepository: new UserRepository()
};