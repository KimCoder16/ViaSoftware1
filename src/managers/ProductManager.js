//src/managers/productmanager.js
import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // ✅ Leer archivo
  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, lo crea vacío
      await fs.writeFile(this.path, "[]");
      return [];
    }
  }

  // ✅ Guardar archivo
  async #saveFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  // ✅ Obtener todos los productos
  async getProducts() {
    return await this.#readFile();
  }

  // ✅ Obtener producto por ID
  async getProductById(id) {
    const products = await this.#readFile();
    return products.find((p) => p.id === id);
  }

  // ✅ Agregar nuevo producto
  async addProduct(productData) {
    const products = await this.#readFile();

    // Autogenerar ID
    const newId =
      products.length > 0
        ? String(Number(products[products.length - 1].id) + 1)
        : "1";

    const newProduct = {
      id: newId,
      title: productData.title || "Sin título",
      description: productData.description || "",
      code: productData.code || `CODE-${newId}`,
      price: Number(productData.price) || 0,
      status: true,
      stock: Number(productData.stock) || 10,
      category: productData.category || "Sin categoría",
      thumbnails: productData.thumbnails || [],
    };

    products.push(newProduct);
    await this.#saveFile(products);
    return newProduct;
  }

  // ✅ Actualizar producto existente
  async updateProduct(id, updatedFields) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Producto no encontrado");
    }

    products[index] = { ...products[index], ...updatedFields, id };
    await this.#saveFile(products);
    return products[index];
  }

  // ✅ Eliminar producto
  async deleteProduct(id) {
    const products = await this.#readFile();
    const filtered = products.filter((p) => p.id !== id);
    await this.#saveFile(filtered);
  }
}
