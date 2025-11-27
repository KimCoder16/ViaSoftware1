// src/app.js
import "./database.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

// 🧭 Configuración de rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// ⚙️ Crear servidor HTTP y configurar Socket.io
const server = createServer(app);
const io = new Server(server);

// 🧩 Instancia del ProductManager (asegura ruta correcta)
const productManager = new ProductManager(path.join(__dirname, "data", "products.json"));

// 🔧 Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// 🧱 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 🚏 Rutas base
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// ⚡ WebSockets con try/catch
io.on("connection", async (socket) => {
  console.log("🟢 Cliente conectado vía WebSocket");

  // Enviar productos iniciales al cliente
  try {
    const products = await productManager.getProducts();
    socket.emit("updateProducts", products);
  } catch (error) {
    console.error("Error al enviar productos iniciales:", error);
  }

  // 📦 Agregar producto
  socket.on("addProduct", async (data) => {
    try {
      await productManager.addProduct(data);
      const updated = await productManager.getProducts();
      io.emit("updateProducts", updated);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  });

  // 🗑️ Eliminar producto
  socket.on("deleteProduct", async (id) => {
    try {
      await productManager.deleteProduct(id);
      const updated = await productManager.getProducts();
      io.emit("updateProducts", updated);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  });
});

// 🚀 Iniciar servidor
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});