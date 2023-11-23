// Instancias y librerias

const express = require("express"); // Utilizando el framework
const fs = require("fs"); // Se importa el módulo 'fs' (File System) para trabajar con el sistema de archivos
const path = require("path"); // Se importa el módulo 'path' para manipular rutas de archivos y directorios
const app = express(); // Instancia de express
const jwt = require("jsonwebtoken"); // Importa la librería jsonwebtoken
const cors = require("cors"); // Cors para las autenticaciones (creo que no se usa porque se termina usando jwt)
const mariadb = require("mariadb"); // Instancia de mariaDB

app.use(express.json()); // Se inicializa express
app.use(cors()); // Se inicializa cors

const puerto = 3000; // Indico puerto al que va a escuchar
let cats = require("./json/./cats/cat.json"); // Utilizo la ruta al archivo JSON

// (consigna 1 (tambien esta agregada la funcionalidad de ver en formato web con .html))
/* Estos get funcionan con los archivos .json y muestran la info del json en la web
 (formato .json, no formato web) */
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

// Estos get funcionan para obtener las paginas web .html con el formato que se utiliza en la web
app.get("/:filename.html", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `${filename}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
});

// Este get entra en la carpeta json, y en sus carpetas respectivas para obtener los .json (todos)
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

// JWT, secretKey y authorizeMiddleware para la autentificacion de login y el ingreso a la web
const SECRET_KEY = "clave"; // Middleware de autorización
const authorizeMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token no válido" });
    }

    req.user = decoded.user;
    next();
  });
};

app.get("/test", authorizeMiddleware, (req, res) => {
  res.status(200).json({message: "Bien"});
});

// (consigna 3)
app.get("/cart", authorizeMiddleware, (req, res) => {
  res.status(200).json({message: "Usuario autorizado"});
})

// Post para la autentificacion del usuario (consigna 2)
app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (user === "admin@admin.com" && password === "admin123") {
    const token = jwt.sign({ user }, SECRET_KEY);
    res.json({ token, user });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});



/* Base de datos en mariaDB, si no la tenemos no funciona ingresar los items del carrito en la bbdd
   (consigna 4)*/
global.pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "carrito",
  connectionLimit: 50,
});

/* Este post envía cada item del carrito a la base de datos y trabaja con los datos del objeto
 (se modificó product-info.js para las propiedades del objeto) */
app.post("/guardarDatos", async (req, res) => {
  try {
    const { name, img, cost, moneda } = req.body;

    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO carttest (name, img, cost, moneda) VALUES (?, ?, ?, ?)",
      [name, img, cost, moneda]
    );
    conn.release();

    res.status(200).json({ message: "Datos guardados correctamente" });
  } catch (error) {
    console.error("Error al guardar datos:", error);
    res.status(500).json({ error: "Hubo un problema al guardar los datos" });
  }
});

/* Los .use con authorizeMiddleware validan la aut. del usuario,
 y los express.static trabajan con los recursos estáticos para darle FORMATO WEB a las paginas
 o endpoints con .html, solo los usuarios autorizados previamente en el post de /login 
 con user = admin@admin.com y password = admin123 pueden entrar luego al get de /cart (consigna 3) */
app.use("/test", authorizeMiddleware);
app.use("/index", authorizeMiddleware);
app.use("/cart", authorizeMiddleware);
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/webfonts", express.static(path.join(__dirname, "webfonts")));
app.use("/json", express.static(path.join(__dirname, "json")));

// Escucha el puerto e inicializa el sv- <npm run dev>
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
