//src/managers/ProductManager.js
import fs from "fs";

const path = "./src/data/products.json";

export default class ProductManager {
  constructor() {
    this.path = path;
  }

  // Obtener todos los productos
  async getProducts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  // Obtener producto por ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  // Agregar producto nuevo
  async addProduct(product) {
    const products = await this.getProducts();

    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      status: true,
      ...product,
    };

    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  // Actualizar producto
  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields, id };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  // Eliminar producto
  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
  }
}
