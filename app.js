const express = require("express"); //Utilizando el framework
const app = express(); // Instancia de express

const puerto = 3000; // Indico puerto al que va a escuchar
let cats = require("./json/cats.json"); //Utilizo la ruta al archivo JSON

app.get("/", (req, res) => {
    res.send("<h1>Bienvenidos al servidor</h1>");
  });

  app.get("/cats", (req, res) => {
    res.json(cats);
  });

  app.get("/cats/:id", (req, res) => {
    res.json(cats[req.params.id]);
  })


  
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto`);
  });