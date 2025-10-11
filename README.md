# ViaSoftware1
Sistema backend para gestión de productos de software profesional, desarrollado con Node.js y Express. Este proyecto permite listar, crear, actualizar y eliminar productos como licencias de Adobe, Autodesk, Microsoft, antivirus y más.

## Características

- API RESTful modular y escalable
- Rutas separadas para productos y carritos
- Persistencia de datos en archivos .json
- Validación básica de campos
- Compatible con herramientas como Postman para pruebas
- Estructura ordenada y fácil de mantener

## Catálogo de productos

Incluye software de las siguientes categorías:

- **ADOBE**: Illustrator, Photoshop, Acrobat, Premiere Pro, Audition
- **AUTODESK**: AutoCAD, Revit, Inventor, Maya, 3DS Max, Eagle
- **DISEÑO**: SketchUp, Archicad, CorelDRAW
- **INGENIERÍA**: CADE SIMU, FluidSIM, Tekla Structures
- **MICROSOFT**: Office 2019/2021/2024/365
- **PLUGINS/ADDONS**: V-Ray, Enscape
- **ANTIVIRUS**: Avast Premium Security

## Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon (para desarrollo)
- JavaScript (ES Modules)
- JSON para persistencia de datos

## Estructura del proyecto
ViaSoftware1/
│
├─ src/
│  ├─ app.js
│  ├─ routes/
│  │   ├─ products.routes.js
│  │   └─ carts.routes.js
│  ├─ managers/
│  │   ├─ ProductManager.js
│  │   └─ CartManager.js
│  └─ data/
│      ├─ products.json
│      └─ carts.json
│
├─ package.json
├─ package-lock.json
└─ README.md

## Endpoints disponibles

| Método | Endpoint                          | Descripción                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/api/products`                   | Lista todos los productos          |
| GET    | `/api/products/:id`               | Muestra producto por ID            |
| POST   | `/api/products`                   | Crea un nuevo producto             |
| PUT    | `/api/products/:id`               | Actualiza producto existente       |
| DELETE | `/api/products/:id`               | Elimina producto por ID            |

## Probar>

Usa [Postman](https://www.postman.com/) o cualquier cliente HTTP para enviar solicitudes a `http://localhost:8080`.

Ejemplo de cuerpo para `POST`:

```json
{
  "title": "Adobe Photoshop 2025",
  "description": "Edición profesional de imágenes",
  "code": "ADOBE-PS2025",
  "price": 85,
  "stock": 50,
  "category": "ADOBE",
  "thumbnails": ["photoshop2025.jpg"]
}

📌 Requisitos
- Node.js instalado
- Ejecutar npm install para instalar dependencias
- Ejecutar npm run dev para iniciar el servidor con Nodemon

Autor
KimCoder16
Desarrolladora backend en formación, apasionada por la organización, la claridad técnica y la excelencia profesional.
