const { ProductRepository } = require('../models/productModel');

class ProductController {
  // Listar todos los productos
  list(req, res) {
    const products = ProductRepository.findAll();
    res.render('products/list', {
      products,
      usuario: req.session.email,
      isLoggedIn: req.session.isLoggedIn || false,
  });
  }

  // Mostrar formulario de nuevo producto
  showNewProductForm(req, res) {
    res.render('products/new', {
      usuario: req.session.email,
      isLoggedIn: req.session.isLoggedIn || false,
  });
  }

  // Procesar creación de nuevo producto
  create(req, res) {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };

    // Crear producto
    const newProduct = ProductRepository.create(productData);

    // Redirigir a lista de productos
    res.redirect('/products');
  }

  // Mostrar detalle de producto
  detail(req, res) {
    const product = ProductRepository.findById(req.params.id);
    
    if (product) {
      res.render('/products/detail', {
        product,
        usuario: req.session.email,
        isLoggedIn: req.session.isLoggedIn || false,
    });
    } else {
      res.status(404).send('Producto no encontrado');
    }
  }
}

module.exports = new ProductController();