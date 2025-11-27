// src/database.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/viasoftware";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // ✅ sin opciones extra
    console.log("🟢 MongoDB conectado");
  } catch (error) {
    console.error("🔴 Error al conectar MongoDB", error);
  }
};

connectDB();
