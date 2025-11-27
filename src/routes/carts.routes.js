//src/routes/carts.routes.js
import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// POST /api/carts - crear un carrito
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid - obtener productos de un carrito
router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cid);

  cart
    ? res.json(cart.products)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

// POST /api/carts/:cid/product/:pid - agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const updatedCart = await cartManager.addProductToCart(cid, pid);

  updatedCart
    ? res.json(updatedCart)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

export default router;