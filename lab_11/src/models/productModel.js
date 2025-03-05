class Product {
    constructor(name, description, price) {
      this.id = Product.generateId();
      this.name = name;
      this.description = description;
      this.price = price;
      this.createdAt = new Date().toISOString();
    }
  
    // Método estático para generar ID único
    static generateId() {
      return Math.floor(Math.random() * 1000).toString();
    }
  }
  
  class ProductRepository {
    constructor() {
      this.products = [];
    }
  
    create(productData) {
      const product = new Product(
        productData.name, 
        productData.description, 
        productData.price
      );
      this.products.push(product);
      return product;
    }
  
    findAll() {
      return this.products;
    }
  
    findById(id) {
      return this.products.find(product => product.id === id);
    }
  }
  
  module.exports = {
    Product,
    ProductRepository: new ProductRepository()
  };