const express = require("express"); //Utilizando el framework
const fs = require("fs"); //Se importa el módulo 'fs' (File System) para trabajar con el sistema de archivos
const path = require("path"); // Se importa el módulo 'path' para manipular rutas de archivos y directorios
const app = express(); // Instancia de express
const jwt = require("jsonwebtoken"); // Importa la librería jsonwebtoken
const cors = require("cors");
const mariadb = require("mariadb");

app.use(express.json());
app.use(cors());

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

const SECRET_KEY = "clave" // Middleware de autorización
const authorizeMiddleware = (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    req.user = decoded.user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { user, password } = req.body;
  
  if (user === 'admin@admin.com' && password === 'admin123') {
    const token = jwt.sign({ user }, SECRET_KEY);
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

app.get('/cart', (req, res) => {
  const user = req.user;

  // Lógica para la ruta /cart aquí

  res.json({ message: 'Ruta /cart accesible solo para usuarios autenticados', user });
});


global.pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'carrito',
  connectionLimit: 50
 });
 
 app.post('/guardarDatos', async (req, res) => {
  try {
     const { name, img, cost, moneda } = req.body;
 
     const conn = await pool.getConnection();
     await conn.query('INSERT INTO carttest (name, img, cost, moneda) VALUES (?, ?, ?, ?)', [name, img, cost, moneda]);
     conn.release();
 
     res.status(200).json({ message: 'Datos guardados correctamente' });
  } catch (error) {
     console.error('Error al guardar datos:', error);
     res.status(500).json({ error: 'Hubo un problema al guardar los datos' });
  }
 });

app.use("/index", authorizeMiddleware);
app.use("/cart", authorizeMiddleware);
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/webfonts", express.static(path.join(__dirname, "webfonts")));
app.use("/json", express.static(path.join(__dirname, "json")));

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
