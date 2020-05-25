const express = require("express");
const router = express.Router();
const _controller = require("../controllers/autenticacion");

//MIDDLEWARE
router.use((req, res, next) => {
  try {
    let url = req.url;
    if (url === "/login") {
      next();
    } else {
      let token = req.headers.token;
      let verify = _controller.validar_token(token);
      next();
    }
  } catch (error) {
    res.status(401).send({ ok: false, info: error, message: "No autenticado" });
  }
});

router.post("/login", (req, res) => {
  try {
    let body = req.body;
    _controller.validar_datos(body);
    _controller
      .consultar_usuario(body)
      .then((answerDB) => {
        let usuario = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;

        if (usuario) {
          let token = _controller.generar_token(usuario);
          res.status(200).send({
            ok: true,
            info: token,
            rol: usuario.rol,
            message: "Persona autenticada",
          });
        } else {
          res.status(400).send({
            ok: false,
            info: {},
            message: "Documento y/o clave incorrecta.",
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/verify", (req, res) => {
  try {
    let token = req.headers.token;
    let verify = _controller.validar_token(token);
    res.status(200).send({
      ok: true,
      info: verify,
      mensaje: "Autenticado.",
    });
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado.",
    });
  }
});

module.exports = router;
