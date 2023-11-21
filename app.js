const express = require("express"); //Utilizando el framework
const fs = require("fs"); //Se importa el módulo 'fs' (File System) para trabajar con el sistema de archivos
const path = require("path"); // Se importa el módulo 'path' para manipular rutas de archivos y directorios
const app = express(); // Instancia de express
const jwt = require("jsonwebtoken"); // Importa la librería jsonwebtoken
const bcrypt = require("bcrypt");
app.use(express.json());

const puerto = 3000; // Indico puerto al que va a escuchar
let cats = require("./json/./cats/cat.json"); //Utilizo la ruta al archivo JSON

app.get("/", (req, res) => {
  res.send("<h1>Bienvenidos al servidor</h1>");
});

app.get("/cats", (req, res) => {
  res.json(cats);
});

app.get("/cats_products/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "json", "cats_products", `${id}.json`);

  fs.readFile(filePath, "utf-8", (error, data) => {
    if (!error) {
      const categoria = JSON.parse(data);
      res.json(categoria);
    } else {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
  });
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const moduloPath = path.join(__dirname, "json", "products", `${id}.json`);

  fs.readFile(moduloPath, "utf-8", (error, data) => {
    if (!error) {
      const productos = JSON.parse(data);
      res.json(productos);
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  });
});

app.get("/products_comments/:id", (req, res) => {
  const id = req.params.id;
  const moduloDosPath = path.join(
    __dirname,
    "json",
    "products_comments",
    `${id}.json`
  );

  fs.readFile(moduloDosPath, "utf-8", (error, data) => {
    if (!error) {
      const comentarios = JSON.parse(data);
      res.json(comentarios);
    } else {
      return res
        .status(404)
        .json({ error: "Este producto no tiene comentarios" });
    }
  });
});

app.get("/:filename.html", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `${filename}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
});

app.get("/json/:subfolder/:filename?", (req, res) => {
  const subfolder = req.params.subfolder;
  const filename = req.params.filename;
  const subfolderPath = path.join(__dirname, "json", subfolder);
  if (filename) {
    const filePath = path.join(subfolderPath, `${filename}.json`); // Corrige esta línea
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      res.json(JSON.parse(jsonData));
    } else {
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  } else {
    const files = fs.readdirSync(subfolderPath);
    res.json({ files });
  }
});
  
// app.use("/cart", authorizeMiddleware);
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/webfonts", express.static(path.join(__dirname, "webfonts")));
app.use("/json", express.static(path.join(__dirname, "json")));

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
