// src/public/js/index.js
const socket = io();

// Escucha los productos actualizados del servidor
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.title} - ${p.category} (S/${p.price}) <button onclick="deleteProduct('${p.id}')">❌</button>`;
    productList.appendChild(li);
  });
});

// Enviar nuevo producto
const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;

  socket.emit("addProduct", { title, category, price });
  form.reset();
});

// Eliminar producto
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
