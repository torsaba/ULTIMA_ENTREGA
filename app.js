const express = require("express"); //Utilizando el framework
const fs = require("fs"); //Se importa el módulo 'fs' (File System) para trabajar con el sistema de archivos
const path = require("path"); // Se importa el módulo 'path' para manipular rutas de archivos y directorios
const app = express(); // Instancia de express

const puerto = 3000; // Indico puerto al que va a escuchar
let cats = require("./json/./cats/cat.json"); //Utilizo la ruta al archivo JSON


app.get("/", (req, res) => {
    res.send("<h1>Bienvenidos al servidor</h1>");
  });

  app.get("/cats", (req, res) => {
    res.json(cats);
  });
app.get("/cats_products/:id", (req, res) =>
{
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
  });
 

  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });