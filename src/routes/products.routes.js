import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import ProductManager from "../managers/ProductManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager(
  path.join(__dirname, "../data/products.json")
);

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    product
      ? res.json(product)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: "Campos incompletos" });
    }

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
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const updatedProduct = await productManager.updateProduct(id, req.body);
    updatedProduct
      ? res.json(updatedProduct)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    await productManager.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default productsRouter;