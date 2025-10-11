// src/routes/products.routes.js
import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productsRouter = Router();
const productManager = new ProductManager();


// GET /api/products - listar todos
productsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid - traer producto por id
productsRouter.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  product
    ? res.json(product)
    : res.status(404).json({ error: "Producto no encontrado" });
});

// POST /api/products - agregar nuevo
productsRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || !stock || !category)
    return res.status(400).json({ error: "Campos incompletos" });

  const newProduct = await productManager.addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails: thumbnails || [],
  });

  res.status(201).json(newProduct);

  console.log("📥 Recibí un producto:", req.body);
});

// PUT /api/products/:pid - actualizar
productsRouter.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const updatedProduct = await productManager.updateProduct(id, req.body);
  updatedProduct
    ? res.json(updatedProduct)
    : res.status(404).json({ error: "Producto no encontrado" });
});

// DELETE /api/products/:pid - eliminar
productsRouter.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  await productManager.deleteProduct(id);
  res.json({ message: "Producto eliminado" });
});

export default productsRouter;