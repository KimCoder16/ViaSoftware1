// src/routes/views.router.js
import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const pm = new ProductManager("./src/data/products.json");


// Vista principal con todos los productos (HTTP normal)
router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  res.render("home", { products });
});

// Vista en tiempo real (con WebSocket)
router.get("/realtimeproducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
