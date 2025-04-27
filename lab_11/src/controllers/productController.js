const { ProductRepository } = require('../models/productModel');
const { AuditRepository } = require('../models/triggerModel'); // Nuevo repositorio para auditoría

class ProductController {
  // Listar todos los productos
  list(req, res) {
    const products = ProductRepository.findAll();
    res.render('products/list', {
      products,
      usuario: req.session.email,
      isLoggedIn: req.session.isLoggedIn || false,
      privilegios: req.session.privilegios || [],
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

    try {
      // TRIGGER 1: Verificar precio válido antes de crear el producto
      this.validatePriceTrigger(productData);

      // Crear producto
      const newProduct = ProductRepository.create(productData);

      // TRIGGER 2: Registrar la creación del producto en la auditoría
      this.auditProductChangeTrigger('CREATE', newProduct, req.session.email);

      // Redirigir a lista de productos
      res.redirect('/products');
    } catch (error) {
      res.status(400).render('products/new', {
        error: error.message,
        productData,
        usuario: req.session.email,
        isLoggedIn: req.session.isLoggedIn || false,
      });
    }
  }

  // Mostrar detalle de producto
  detail(req, res) {
    const product = ProductRepository.findById(req.params.id);
    if (product) {
      res.render('products/detail', { // Corregido de '/products/new' a 'products/detail'
        product,
        usuario: req.session.email,
        isLoggedIn: req.session.isLoggedIn || false,
      });
    } else {
      res.status(404).send('Producto no encontrado');
    }
  }

  // Actualizar producto
  update(req, res) {
    const productId = req.params.id;
    const oldProduct = ProductRepository.findById(productId);
    
    if (!oldProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };

    try {
      // TRIGGER 1: Verificar precio válido antes de actualizar
      this.validatePriceTrigger(updatedData);

      // Actualizar producto
      const updatedProduct = ProductRepository.update(productId, updatedData);

      // TRIGGER 2: Registrar la actualización en la auditoría
      this.auditProductChangeTrigger('UPDATE', updatedProduct, req.session.email, oldProduct);

      res.redirect('/products');
    } catch (error) {
      res.status(400).render('products/edit', {
        error: error.message,
        product: { ...oldProduct, ...updatedData },
        usuario: req.session.email,
        isLoggedIn: req.session.isLoggedIn || false,
      });
    }
  }

  // TRIGGER 1: Validar precio antes de crear/actualizar producto
  validatePriceTrigger(productData) {
    console.log('⚡ Ejecutando TRIGGER de validación de precio');
    
    const price = parseFloat(productData.price);
    
    // Verificar que el precio sea un número
    if (isNaN(price)) {
      throw new Error('El precio debe ser un número válido');
    }
    
    // Verificar que el precio sea positivo
    if (price <= 0) {
      throw new Error('El precio debe ser mayor que cero');
    }
    
    // Verificar que el precio no sea excesivamente alto (ejemplo: límite de 1,000,000)
    if (price > 1000000) {
      throw new Error('El precio es demasiado alto');
    }
    
    console.log('✅ TRIGGER de validación de precio ejecutado con éxito');
    return true;
  }

  // TRIGGER 2: Registrar cambios en productos en una tabla de auditoría
  auditProductChangeTrigger(action, product, userEmail, oldProduct = null) {
    console.log(`⚡ Ejecutando TRIGGER de auditoría para ${action}`);
    
    const auditEntry = {
      action,
      productId: product.id,
      productName: product.name,
      timestamp: new Date(),
      userEmail,
      oldData: oldProduct ? JSON.stringify(oldProduct) : null,
      newData: JSON.stringify(product)
    };
    
    // Guardar entrada de auditoría
    AuditRepository.create(auditEntry);
    
    console.log('✅ TRIGGER de auditoría ejecutado con éxito');
    return true;
  }
}

module.exports = new ProductController();