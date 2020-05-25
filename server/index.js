
// Importar express
const express = require("express");
const cors = require("cors");

// Inicializar la librería
const app = express();
app.use(express.json());
app.use(cors());
// VERSION del api
const vs = "/api/v1/";

const ruta_usuarios = require("./routes/usuarios");
const ruta_motos = require("./routes/motos");
const ruta_roles = require("./routes/roles");
const ruta_tipos_documentos = require("./routes/tipos_documentos");
const ruta_mantenimientos = require("./routes/mantenimientos");
const ruta_login = require("./routes/autenticacion");

app.use(vs, ruta_login);
app.use(vs, ruta_tipos_documentos);
app.use(vs, ruta_roles);
app.use(vs, ruta_motos);
app.use(vs, ruta_usuarios);
app.use(vs, ruta_mantenimientos);

app.use('/', (req, res) => {
  res.status(404).send({
    ok: false, message: 'El recurso que busca no existe'
  })
});

// Puerto
const port = 8000;
app.listen(port, () => {
  console.log(`Escuchando API en http://localhost:${port}/api/v1/`);
});

