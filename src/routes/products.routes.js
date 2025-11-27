// src/routes/products.routes.js
import { Router } from "express";
import ProductDAO from "../dao/ProductDAO.js";

const productsRouter = Router();
const productDAO = new ProductDAO();

// GET /api/products - listar todos
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productDAO.getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET /api/products/:pid - obtener por ID (Mongo ObjectId en string)
productsRouter.get("/:pid", async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.pid);
    product
      ? res.json(product)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST /api/products - crear
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = await productDAO.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT /api/products/:pid - actualizar
productsRouter.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await productDAO.updateProduct(req.params.pid, req.body);
    updatedProduct
      ? res.json(updatedProduct)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// DELETE /api/products/:pid - eliminar
productsRouter.delete("/:pid", async (req, res) => {
  try {
    await productDAO.deleteProduct(req.params.pid);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default productsRouter;