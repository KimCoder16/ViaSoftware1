// src/dao/ProductDAO.js
import Product from "../models/product.js";

export default class ProductDAO {
  // Obtener todos los productos
  async getProducts() {
    return await Product.find();
  }

  // Obtener producto por ID
  async getProductById(id) {
    return await Product.findById(id);
  }

  // Crear nuevo producto
  async createProduct(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  // Actualizar producto existente
  async updateProduct(id, updatedFields) {
    return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  // Eliminar producto
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}