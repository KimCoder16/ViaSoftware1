//src/managers/CartManager.js
import fs from "fs";

const path = "./src/data/carts.json";

export default class CartManager {
  constructor() {
    this.path = path;
  }

  // Leer todos los carritos
  async getCarts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  // Obtener carrito por ID
  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((c) => c.id === id);
  }

  // Crear un nuevo carrito
  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1,
      products: []
    };

    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  // Agregar producto a un carrito existente
  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}
